import type { BalanceSheetV2 } from "@hifi/protocol/dist/types/contracts/core/balance-sheet/BalanceSheetV2";
import type { Fintroller } from "@hifi/protocol/dist/types/contracts/core/fintroller/Fintroller";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import type { GodModeErc20 } from "../../src/types/contracts/test/GodModeErc20";
import type { GodModeHToken } from "../../src/types/contracts/test/GodModeHToken";
import type { SimplePriceFeed } from "../../src/types/contracts/test/SimplePriceFeed";
import type { FlashUniswapV2 } from "../../src/types/contracts/uniswap-v2/FlashUniswapV2";
import type { GodModeUniswapV2Pair } from "../../src/types/contracts/uniswap-v2/test/GodModeUniswapV2Pair";
import type { MaliciousPair as MaliciousV2Pair } from "../../src/types/contracts/uniswap-v2/test/MaliciousPair";
import type { FlashUniswapV3 } from "../../src/types/contracts/uniswap-v3/FlashUniswapV3";
import type { UniswapV3Pool } from "../../src/types/contracts/uniswap-v3/UniswapV3Pool";
import type { GodModeNonfungiblePositionManager } from "../../src/types/contracts/uniswap-v3/test/GodModeNonfungiblePositionManager";

declare module "mocha" {
  export interface Context {
    contracts: Contracts;
    signers: Signers;
  }
}

export interface Contracts {
  balanceSheet: BalanceSheetV2;
  fintroller: Fintroller;
  flashUniswapV2: FlashUniswapV2;
  flashUniswapV3: FlashUniswapV3;
  hToken: GodModeHToken;
  maliciousV2Pair: MaliciousV2Pair;
  usdc: GodModeErc20;
  usdcPriceFeed: SimplePriceFeed;
  uniswapV2Pair: GodModeUniswapV2Pair;
  uniswapV3Pool: UniswapV3Pool;
  uniswapV3PositionManager: GodModeNonfungiblePositionManager;
  wbtc: GodModeErc20;
  wbtcPriceFeed: SimplePriceFeed;
}

export interface Signers {
  admin: SignerWithAddress;
  borrower: SignerWithAddress;
  liquidator: SignerWithAddress;
  raider: SignerWithAddress;
}
