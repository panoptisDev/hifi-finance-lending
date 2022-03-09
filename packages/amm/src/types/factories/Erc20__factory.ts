/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Erc20, Erc20Interface } from "../Erc20";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "decimals_",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "Erc20__ApproveOwnerZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "Erc20__ApproveSpenderZeroAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Erc20__InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "senderBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Erc20__InsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "Erc20__TransferRecipientZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "Erc20__TransferSenderZeroAddress",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedAmount",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedAmount",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523480156200001157600080fd5b5060405162000a1038038062000a108339810160408190526200003491620001e2565b8251620000499060009060208601906200006f565b5081516200005f9060019060208501906200006f565b5060ff1660805250620002a49050565b8280546200007d9062000267565b90600052602060002090601f016020900481019282620000a15760008555620000ec565b82601f10620000bc57805160ff1916838001178555620000ec565b82800160010185558215620000ec579182015b82811115620000ec578251825591602001919060010190620000cf565b50620000fa929150620000fe565b5090565b5b80821115620000fa5760008155600101620000ff565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200013d57600080fd5b81516001600160401b03808211156200015a576200015a62000115565b604051601f8301601f19908116603f0116810190828211818310171562000185576200018562000115565b81604052838152602092508683858801011115620001a257600080fd5b600091505b83821015620001c65785820183015181830184015290820190620001a7565b83821115620001d85760008385830101525b9695505050505050565b600080600060608486031215620001f857600080fd5b83516001600160401b03808211156200021057600080fd5b6200021e878388016200012b565b945060208601519150808211156200023557600080fd5b5062000244868287016200012b565b925050604084015160ff811681146200025c57600080fd5b809150509250925092565b600181811c908216806200027c57607f821691505b602082108114156200029e57634e487b7160e01b600052602260045260246000fd5b50919050565b608051610750620002c0600039600061013e01526107506000f3fe608060405234801561001057600080fd5b50600436106100c95760003560e01c80633950935111610081578063a457c2d71161005b578063a457c2d7146101b6578063a9059cbb146101c9578063dd62ed3e146101dc57600080fd5b8063395093511461017257806370a082311461018557806395d89b41146101ae57600080fd5b806318160ddd116100b257806318160ddd1461010f57806323b872dd14610126578063313ce5671461013957600080fd5b806306fdde03146100ce578063095ea7b3146100ec575b600080fd5b6100d6610215565b6040516100e39190610597565b60405180910390f35b6100ff6100fa366004610608565b6102a3565b60405190151581526020016100e3565b61011860025481565b6040519081526020016100e3565b6100ff610134366004610632565b6102b9565b6101607f000000000000000000000000000000000000000000000000000000000000000081565b60405160ff90911681526020016100e3565b6100ff610180366004610608565b610332565b61011861019336600461066e565b6001600160a01b031660009081526003602052604090205490565b6100d661037a565b6100ff6101c4366004610608565b610387565b6100ff6101d7366004610608565b6103b8565b6101186101ea366004610690565b6001600160a01b03918216600090815260046020908152604080832093909416825291909152205490565b60008054610222906106c3565b80601f016020809104026020016040519081016040528092919081815260200182805461024e906106c3565b801561029b5780601f106102705761010080835404028352916020019161029b565b820191906000526020600020905b81548152906001019060200180831161027e57829003601f168201915b505050505081565b60006102b03384846103c5565b50600192915050565b60006102c6848484610474565b6001600160a01b03841660009081526004602090815260408083203384529091529020548281101561031a57604051632b3ca6f360e11b815260048101829052602481018490526044015b60405180910390fd5b61032785338584036103c5565b506001949350505050565b3360009081526004602090815260408083206001600160a01b03861684529091528120548190610363908490610714565b90506103703385836103c5565b5060019392505050565b60018054610222906106c3565b3360009081526004602090815260408083206001600160a01b0386168452909152812054819061036390849061072c565b60006102b0338484610474565b6001600160a01b0383166103ec5760405163230326bf60e11b815260040160405180910390fd5b6001600160a01b03821661041357604051630b39ecd960e21b815260040160405180910390fd5b6001600160a01b0383811660008181526004602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b03831661049b5760405163907bfbd760e01b815260040160405180910390fd5b6001600160a01b0382166104c257604051637184c13f60e01b815260040160405180910390fd5b6001600160a01b0383166000908152600360205260409020548181101561050657604051632dcf2e2160e21b81526004810182905260248101839052604401610311565b6001600160a01b0380851660009081526003602052604080822085850390559185168152908120805484929061053d908490610714565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161058991815260200190565b60405180910390a350505050565b600060208083528351808285015260005b818110156105c4578581018301518582016040015282016105a8565b818111156105d6576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461060357600080fd5b919050565b6000806040838503121561061b57600080fd5b610624836105ec565b946020939093013593505050565b60008060006060848603121561064757600080fd5b610650846105ec565b925061065e602085016105ec565b9150604084013590509250925092565b60006020828403121561068057600080fd5b610689826105ec565b9392505050565b600080604083850312156106a357600080fd5b6106ac836105ec565b91506106ba602084016105ec565b90509250929050565b600181811c908216806106d757607f821691505b602082108114156106f857634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60008219821115610727576107276106fe565b500190565b60008282101561073e5761073e6106fe565b50039056fea164736f6c634300080c000a";

type Erc20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Erc20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Erc20__factory extends ContractFactory {
  constructor(...args: Erc20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Erc20";
  }

  deploy(
    name_: string,
    symbol_: string,
    decimals_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Erc20> {
    return super.deploy(
      name_,
      symbol_,
      decimals_,
      overrides || {}
    ) as Promise<Erc20>;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    decimals_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      name_,
      symbol_,
      decimals_,
      overrides || {}
    );
  }
  attach(address: string): Erc20 {
    return super.attach(address) as Erc20;
  }
  connect(signer: Signer): Erc20__factory {
    return super.connect(signer) as Erc20__factory;
  }
  static readonly contractName: "Erc20";
  public readonly contractName: "Erc20";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Erc20Interface {
    return new utils.Interface(_abi) as Erc20Interface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Erc20 {
    return new Contract(address, _abi, signerOrProvider) as Erc20;
  }
}
