import { BigNumber } from "@ethersproject/bignumber";
import { MockContract } from "ethereum-waffle";
import { Signer } from "@ethersproject/abstract-signer";

import { GodModeBalanceSheet as BalanceSheet } from "../typechain/GodModeBalanceSheet";
import { Erc20Mintable } from "../typechain/Erc20Mintable";
import { Fintroller } from "../typechain/Fintroller";
import { GodModeRedemptionPool as RedemptionPool } from "../typechain/GodModeRedemptionPool";
import { GodModeYToken as YToken } from "../typechain/GodModeYToken";
import { SimpleUniswapAnchoredView } from "../typechain/SimpleUniswapAnchoredView";

/* Fingers-crossed that ethers.js or waffle will provide an easier way to cache the address */
export interface Accounts {
  admin: string;
  brad: string;
  eve: string;
  grace: string;
  lucy: string;
  mark: string;
}

export interface Contracts {
  balanceSheet: BalanceSheet;
  collateral: Erc20Mintable;
  fintroller: Fintroller;
  oracle: SimpleUniswapAnchoredView;
  redemptionPool: RedemptionPool;
  underlying: Erc20Mintable;
  yToken: YToken;
}

export interface Signers {
  admin: Signer;
  brad: Signer;
  eve: Signer;
  grace: Signer;
  lucy: Signer;
  mark: Signer;
}

export interface Stubs {
  balanceSheet: MockContract;
  collateral: MockContract;
  fintroller: MockContract;
  oracle: MockContract;
  redemptionPool: MockContract;
  underlying: MockContract;
  yToken: MockContract;
}

export interface Vault {
  debt: BigNumber;
  freeCollateral: BigNumber;
  lockedCollateral: BigNumber;
  isOpen: boolean;
}
