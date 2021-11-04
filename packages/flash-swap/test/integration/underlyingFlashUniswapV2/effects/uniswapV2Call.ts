import { defaultAbiCoder } from "@ethersproject/abi";
import { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { LIQUIDATION_INCENTIVES } from "@hifi/constants";
import { BalanceSheetErrors, UnderlyingFlashUniswapV2Errors } from "@hifi/errors";
import { USDC, WBTC, hUSDC, price } from "@hifi/helpers";
import { expect } from "chai";

import type { GodModeErc20 } from "../../../../src/types/GodModeErc20";
import { deployGodModeErc20 } from "../../../shared/deployers";

async function bumpPoolReserves(this: Mocha.Context, wbtcAmount: BigNumber, usdcAmount: BigNumber): Promise<void> {
  // Mint WBTC to the pair contract.
  if (!wbtcAmount.isZero()) {
    await this.contracts.wbtc.__godMode_mint(this.contracts.uniswapV2Pair.address, wbtcAmount);
  }

  // Mint USDC to the pair contract.
  if (!usdcAmount.isZero()) {
    await this.contracts.usdc.__godMode_mint(this.contracts.uniswapV2Pair.address, usdcAmount);
  }

  // Sync the token reserves in the UniswapV2Pair contract.
  await this.contracts.uniswapV2Pair.sync();
}

function encodeCallData(this: Mocha.Context): string {
  const types = ["address", "address", "address"];
  const values = [this.signers.borrower.address, this.contracts.hToken.address, this.signers.subsidizer.address];
  const data: string = defaultAbiCoder.encode(types, values);
  return data;
}

async function getSeizableAndRepayCollateralAmounts(
  this: Mocha.Context,
  repayHUsdcAmount: BigNumber,
  underlyingAmount: BigNumber,
): Promise<{ expectedRepayUsdcAmount: BigNumber; seizableUsdcAmount: BigNumber }> {
  const seizableUsdcAmount = await this.contracts.balanceSheet.getSeizableCollateralAmount(
    this.contracts.hToken.address,
    repayHUsdcAmount,
    this.contracts.usdc.address,
  );
  const expectedRepayUsdcAmount = underlyingAmount.mul(1000).div(997).add(1);
  return { expectedRepayUsdcAmount, seizableUsdcAmount };
}

async function getTokenAmounts(
  this: Mocha.Context,
  wbtcAmount: BigNumber,
  usdcAmount: BigNumber,
): Promise<{ token0Amount: BigNumber; token1Amount: BigNumber }> {
  const token0: string = await this.contracts.uniswapV2Pair.token0();
  if (token0 == this.contracts.wbtc.address) {
    return {
      token0Amount: wbtcAmount,
      token1Amount: usdcAmount,
    };
  } else {
    return {
      token0Amount: usdcAmount,
      token1Amount: wbtcAmount,
    };
  }
}

async function reducePoolReserves(this: Mocha.Context, wbtcAmount: BigNumber, usdcAmount: BigNumber): Promise<void> {
  // Mint WBTC to the pair contract.
  if (!wbtcAmount.isZero()) {
    await this.contracts.wbtc.__godMode_burn(this.contracts.uniswapV2Pair.address, wbtcAmount);
  }

  // Mint USDC to the pair contract.
  if (!usdcAmount.isZero()) {
    await this.contracts.usdc.__godMode_burn(this.contracts.uniswapV2Pair.address, usdcAmount);
  }

  // Sync the token reserves in the UniswapV2Pair contract.
  await this.contracts.uniswapV2Pair.sync();
}

export function shouldBehaveLikeUniswapV2Call(): void {
  context("when the data is malformed", function () {
    it("reverts", async function () {
      const sender: string = this.signers.raider.address;
      const token0Amount: BigNumber = Zero;
      const token1Amount: BigNumber = Zero;
      const data: string = "0x";
      await expect(
        this.contracts.underlyingFlashUniswapV2
          .connect(this.signers.raider)
          .uniswapV2Call(sender, token0Amount, token1Amount, data),
      ).to.be.reverted;
    });
  });

  context("when the data is encoded correctly", function () {
    let data: string;

    beforeEach(function () {
      data = encodeCallData.call(this);
    });

    context("when the caller is not the UniswapV2Pair contract", function () {
      const token0Amount: BigNumber = Zero;
      const token1Amount: BigNumber = Zero;
      let sender: string;

      beforeEach(async function () {
        sender = this.signers.raider.address;
      });

      context("when the caller is an externally owned account", function () {
        it("reverts", async function () {
          await expect(
            this.contracts.underlyingFlashUniswapV2
              .connect(this.signers.raider)
              .uniswapV2Call(sender, token0Amount, token1Amount, data),
          ).to.be.revertedWith("function call to a non-contract account");
        });
      });

      context("when the caller is a malicious pair", function () {
        it("reverts", async function () {
          const to: string = this.contracts.underlyingFlashUniswapV2.address;
          await expect(
            this.contracts.maliciousPair.connect(this.signers.raider).swap(token0Amount, token1Amount, to, data),
          ).to.be.revertedWith(UnderlyingFlashUniswapV2Errors.CallNotAuthorized);
        });
      });
    });

    context("when the caller is the pair contract", function () {
      beforeEach(async function () {
        // Set the oracle price to 1 WBTC = $20k.
        await this.contracts.wbtcPriceFeed.setPrice(price("20000"));

        // Set the oracle price to 1 USDC = $1.
        await this.contracts.usdcPriceFeed.setPrice(price("1"));

        // Mint 100 WBTC and 2m USDC to the pair contract. This makes the price 1 WBTC ~ 20k USDC.
        await bumpPoolReserves.call(this, WBTC("100"), USDC("2e6"));
      });

      context("when the underlying is not in the pair contract", function () {
        it("reverts", async function () {
          const { token0Amount, token1Amount } = await getTokenAmounts.call(this, Zero, USDC("10000"));
          const foo: GodModeErc20 = await deployGodModeErc20(this.signers.admin, "Foo", "FOO", BigNumber.from(18));
          await this.contracts.hToken.__godMode_setUnderlying(foo.address);
          const to: string = this.contracts.underlyingFlashUniswapV2.address;
          await expect(
            this.contracts.uniswapV2Pair.connect(this.signers.raider).swap(token0Amount, token1Amount, to, data),
          ).to.be.revertedWith(UnderlyingFlashUniswapV2Errors.UnderlyingNotInPool);
        });
      });

      context("when the underlying is in the pair contract", function () {
        context("when the other token is flash borrowed", function () {
          it("reverts", async function () {
            const { token0Amount, token1Amount } = await getTokenAmounts.call(this, WBTC("1"), Zero);
            const to: string = this.contracts.underlyingFlashUniswapV2.address;
            await expect(
              this.contracts.uniswapV2Pair.connect(this.signers.raider).swap(token0Amount, token1Amount, to, data),
            ).to.be.revertedWith(UnderlyingFlashUniswapV2Errors.FlashBorrowOtherToken);
          });
        });

        context("when underlying is flash borrowed", function () {
          const borrowAmount: BigNumber = hUSDC("10000");
          const collateralCeilingUsdc: BigNumber = USDC("1000000");
          const collateralCeilingWbtc: BigNumber = WBTC("50");
          const debtCeiling: BigNumber = hUSDC("1e6");
          const depositUsdcAmount: BigNumber = USDC("10000");
          const depositWbtcAmount: BigNumber = WBTC("0.5");
          const feeUsdcAmount: BigNumber = USDC("30.090271");
          const swapUsdcAmount: BigNumber = USDC("10000");
          const swapWbtcAmount: BigNumber = Zero;

          let token0Amount: BigNumber;
          let token1Amount: BigNumber;

          beforeEach(async function () {
            const tokenAmounts = await getTokenAmounts.call(this, swapWbtcAmount, swapUsdcAmount);
            token0Amount = tokenAmounts.token0Amount;
            token1Amount = tokenAmounts.token1Amount;

            // List the bond in the Fintroller.
            await this.contracts.fintroller.connect(this.signers.admin).listBond(this.contracts.hToken.address);

            // List the collaterals in the Fintroller.
            await this.contracts.fintroller.connect(this.signers.admin).listCollateral(this.contracts.usdc.address);
            await this.contracts.fintroller.connect(this.signers.admin).listCollateral(this.contracts.wbtc.address);

            // Set the liquidation incentive for USDC to 100%.
            await this.contracts.fintroller
              .connect(this.signers.admin)
              .setLiquidationIncentive(this.contracts.usdc.address, LIQUIDATION_INCENTIVES.lowerBound);

            // Set the liquidation incentive for WBTC to 110%.
            await this.contracts.fintroller
              .connect(this.signers.admin)
              .setLiquidationIncentive(this.contracts.wbtc.address, LIQUIDATION_INCENTIVES.default);

            // Set the collateral ceilings.
            await this.contracts.fintroller
              .connect(this.signers.admin)
              .setCollateralCeiling(this.contracts.usdc.address, collateralCeilingUsdc);
            await this.contracts.fintroller
              .connect(this.signers.admin)
              .setCollateralCeiling(this.contracts.wbtc.address, collateralCeilingWbtc);

            // Set the debt ceiling.
            await this.contracts.fintroller
              .connect(this.signers.admin)
              .setDebtCeiling(this.contracts.hToken.address, debtCeiling);

            // Mint USDC and approve the BalanceSheet to spend it.
            await this.contracts.usdc.__godMode_mint(this.signers.borrower.address, depositUsdcAmount);
            await this.contracts.usdc
              .connect(this.signers.borrower)
              .approve(this.contracts.balanceSheet.address, depositUsdcAmount);

            // Mint WBTC and approve the BalanceSheet to spend it.
            await this.contracts.wbtc.__godMode_mint(this.signers.borrower.address, depositWbtcAmount);
            await this.contracts.wbtc
              .connect(this.signers.borrower)
              .approve(this.contracts.balanceSheet.address, depositWbtcAmount);

            // Mint USDC to the subsidizer wallet and approve the flash swap contract to spend it.
            await this.contracts.usdc.__godMode_mint(this.signers.subsidizer.address, feeUsdcAmount);
            await this.contracts.usdc
              .connect(this.signers.subsidizer)
              .approve(this.contracts.underlyingFlashUniswapV2.address, feeUsdcAmount);

            // Deposit the USDC in the BalanceSheet.
            await this.contracts.balanceSheet
              .connect(this.signers.borrower)
              .depositCollateral(this.contracts.usdc.address, depositUsdcAmount);

            // Deposit the WBTC in the BalanceSheet.
            await this.contracts.balanceSheet
              .connect(this.signers.borrower)
              .depositCollateral(this.contracts.wbtc.address, depositWbtcAmount);

            // Borrow hUSDC.
            await this.contracts.balanceSheet
              .connect(this.signers.borrower)
              .borrow(this.contracts.hToken.address, borrowAmount);
          });

          context("when the borrower does not have a liquidity shortfall", function () {
            it("reverts", async function () {
              const to: string = this.contracts.underlyingFlashUniswapV2.address;
              await expect(
                this.contracts.uniswapV2Pair
                  .connect(this.signers.liquidator)
                  .swap(token0Amount, token1Amount, to, data),
              ).to.be.revertedWith(BalanceSheetErrors.NO_LIQUIDITY_SHORTFALL);
            });
          });

          context("when the price given by the pair contract price is better than the oracle price", function () {
            beforeEach(async function () {
              // Set the WBTC price to $5k to make borrower's collateral ratio 125%.
              await this.contracts.wbtcPriceFeed.setPrice(price("5000"));

              // Burn 1.75m USDC from the pair contract. This makes the pair contract price 1 WBTC ~ 2.5k USDC.
              await reducePoolReserves.call(this, Zero, USDC("1.75e6"));
            });

            it("flash swaps USDC making no USDC profit and spending allocated USDC to pay swap fee", async function () {
              const to: string = this.contracts.underlyingFlashUniswapV2.address;
              const oldUsdcBalanceAccount = await this.contracts.usdc.balanceOf(this.signers.liquidator.address);
              const oldUsdcBalanceBot = await this.contracts.usdc.balanceOf(this.signers.subsidizer.address);
              await this.contracts.uniswapV2Pair
                .connect(this.signers.liquidator)
                .swap(token0Amount, token1Amount, to, data);
              const newUsdcBalanceAccount = await this.contracts.usdc.balanceOf(this.signers.liquidator.address);
              const newUsdcBalanceBot = await this.contracts.usdc.balanceOf(this.signers.subsidizer.address);
              expect(newUsdcBalanceAccount).to.equal(oldUsdcBalanceAccount);
              expect(oldUsdcBalanceBot.sub(newUsdcBalanceBot)).to.equal(feeUsdcAmount);
            });
          });

          context("when the borrower has a liquidity shortfall", function () {
            context("when the price given by the pair contract is the same as the oracle price", function () {
              let seizableUsdcAmount: BigNumber;
              let expectedRepayUsdcAmount: BigNumber;

              context("when the collateral ratio is lower than 110%", function () {
                const repayHUsdcAmount: BigNumber = hUSDC("9090.909090909090909090");

                beforeEach(async function () {
                  // Set the WBTC price to $10k to make the borrower's collateral ratio 100%.
                  await this.contracts.wbtcPriceFeed.setPrice(price("10000"));

                  // Calculate the amounts necessary for running the tests.
                  const calculatesAmounts = await getSeizableAndRepayCollateralAmounts.call(
                    this,
                    repayHUsdcAmount,
                    swapUsdcAmount,
                  );
                  seizableUsdcAmount = calculatesAmounts.seizableUsdcAmount;
                });

                it("flash swaps USDC making no USDC profit and spending allocated USDC to pay swap fee", async function () {
                  const to: string = this.contracts.underlyingFlashUniswapV2.address;
                  const oldUsdcBalanceAccount = await this.contracts.usdc.balanceOf(this.signers.liquidator.address);
                  const oldUsdcBalanceBot = await this.contracts.usdc.balanceOf(this.signers.subsidizer.address);
                  await this.contracts.uniswapV2Pair
                    .connect(this.signers.liquidator)
                    .swap(token0Amount, token1Amount, to, data);
                  const newUsdcBalanceAccount = await this.contracts.usdc.balanceOf(this.signers.liquidator.address);
                  const newUsdcBalanceBot = await this.contracts.usdc.balanceOf(this.signers.subsidizer.address);
                  expect(newUsdcBalanceAccount).to.equal(oldUsdcBalanceAccount);
                  expect(oldUsdcBalanceBot.sub(newUsdcBalanceBot)).to.equal(feeUsdcAmount);
                });
              });

              context("when the collateral ratio is lower than 150% but higher than 110%", function () {
                const repayHUsdcAmount: BigNumber = hUSDC("10000");

                beforeEach(async function () {
                  // Set the WBTC price to $5k to make borrower's collateral ratio 125%.
                  await this.contracts.wbtcPriceFeed.setPrice(price("5000"));

                  // Burn 1.5m USDC from the pair contract, which makes the price 1 WBTC ~ 5k USDC.
                  await reducePoolReserves.call(this, Zero, USDC("1.5e6"));

                  // Calculate the amounts necessary for running the tests.
                  const calculatesAmounts = await getSeizableAndRepayCollateralAmounts.call(
                    this,
                    repayHUsdcAmount,
                    swapUsdcAmount,
                  );
                  seizableUsdcAmount = calculatesAmounts.seizableUsdcAmount;
                  expectedRepayUsdcAmount = calculatesAmounts.expectedRepayUsdcAmount;
                });

                context("new order of tokens in the pair", function () {
                  let localToken0Amount: BigNumber;
                  let localToken1Amount: BigNumber;

                  beforeEach(async function () {
                    const token0: string = await this.contracts.uniswapV2Pair.token0();
                    if (token0 == this.contracts.wbtc.address) {
                      await this.contracts.uniswapV2Pair.__godMode_setToken0(this.contracts.usdc.address);
                      await this.contracts.uniswapV2Pair.__godMode_setToken1(this.contracts.wbtc.address);
                      localToken0Amount = swapUsdcAmount;
                      localToken1Amount = swapWbtcAmount;
                    } else {
                      await this.contracts.uniswapV2Pair.__godMode_setToken0(this.contracts.wbtc.address);
                      await this.contracts.uniswapV2Pair.__godMode_setToken1(this.contracts.usdc.address);
                      localToken0Amount = swapWbtcAmount;
                      localToken1Amount = swapUsdcAmount;
                    }
                    await this.contracts.uniswapV2Pair.sync();
                  });

                  it("flash swaps USDC making no USDC profit and spending allocated USDC to pay swap fee", async function () {
                    const to: string = this.contracts.underlyingFlashUniswapV2.address;
                    const oldUsdcBalanceAccount = await this.contracts.usdc.balanceOf(this.signers.liquidator.address);
                    const oldUsdcBalanceBot = await this.contracts.usdc.balanceOf(this.signers.subsidizer.address);
                    await this.contracts.uniswapV2Pair
                      .connect(this.signers.liquidator)
                      .swap(localToken0Amount, localToken1Amount, to, data);
                    const newUsdcBalanceAccount = await this.contracts.usdc.balanceOf(this.signers.liquidator.address);
                    const newUsdcBalanceBot = await this.contracts.usdc.balanceOf(this.signers.subsidizer.address);
                    expect(newUsdcBalanceAccount).to.equal(oldUsdcBalanceAccount);
                    expect(oldUsdcBalanceBot.sub(newUsdcBalanceBot)).to.equal(feeUsdcAmount);
                  });
                });

                context("initial order of tokens in the pair", function () {
                  it("flash swaps USDC making no USDC profit and spending allocated USDC to pay swap fee", async function () {
                    const to: string = this.contracts.underlyingFlashUniswapV2.address;
                    const oldUsdcBalanceAccount = await this.contracts.usdc.balanceOf(this.signers.liquidator.address);
                    const oldUsdcBalanceBot = await this.contracts.usdc.balanceOf(this.signers.subsidizer.address);
                    await this.contracts.uniswapV2Pair
                      .connect(this.signers.liquidator)
                      .swap(token0Amount, token1Amount, to, data);
                    const newUsdcBalanceAccount = await this.contracts.usdc.balanceOf(this.signers.liquidator.address);
                    const newUsdcBalanceBot = await this.contracts.usdc.balanceOf(this.signers.subsidizer.address);
                    expect(newUsdcBalanceAccount).to.equal(oldUsdcBalanceAccount);
                    expect(oldUsdcBalanceBot.sub(newUsdcBalanceBot)).to.equal(feeUsdcAmount);
                  });

                  it("emits a FlashSwapUnderlyingAndLiquidateBorrow event", async function () {
                    const to: string = this.contracts.underlyingFlashUniswapV2.address;
                    const contractCall = this.contracts.uniswapV2Pair
                      .connect(this.signers.liquidator)
                      .swap(token0Amount, token1Amount, to, data);
                    await expect(contractCall)
                      .to.emit(this.contracts.underlyingFlashUniswapV2, "FlashSwapUnderlyingAndLiquidateBorrow")
                      .withArgs(
                        this.signers.liquidator.address,
                        this.signers.borrower.address,
                        this.contracts.hToken.address,
                        swapUsdcAmount,
                        seizableUsdcAmount,
                        expectedRepayUsdcAmount,
                      );
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}
