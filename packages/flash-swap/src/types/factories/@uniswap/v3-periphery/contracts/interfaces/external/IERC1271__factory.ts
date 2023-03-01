/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  IERC1271,
  IERC1271Interface,
} from "../../../../../../@uniswap/v3-periphery/contracts/interfaces/external/IERC1271";
import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "isValidSignature",
    outputs: [
      {
        internalType: "bytes4",
        name: "magicValue",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IERC1271__factory {
  static readonly abi = _abi;
  static createInterface(): IERC1271Interface {
    return new utils.Interface(_abi) as IERC1271Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IERC1271 {
    return new Contract(address, _abi, signerOrProvider) as IERC1271;
  }
}
