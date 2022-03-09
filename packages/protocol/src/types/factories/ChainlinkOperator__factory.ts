/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ChainlinkOperator,
  ChainlinkOperatorInterface,
} from "../ChainlinkOperator";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "decimals",
        type: "uint256",
      },
    ],
    name: "ChainlinkOperator__DecimalsMismatch",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    name: "ChainlinkOperator__FeedNotSet",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    name: "ChainlinkOperator__PriceZero",
    type: "error",
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
        name: "caller",
        type: "address",
      },
    ],
    name: "Ownable__NotOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "Ownable__OwnerZeroAddress",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract IErc20",
        name: "asset",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract IAggregatorV3",
        name: "feed",
        type: "address",
      },
    ],
    name: "DeleteFeed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract IErc20",
        name: "asset",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract IAggregatorV3",
        name: "feed",
        type: "address",
      },
    ],
    name: "SetFeed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "TransferOwnership",
    type: "event",
  },
  {
    inputs: [],
    name: "_renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "_transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    name: "deleteFeed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    name: "getFeed",
    outputs: [
      {
        internalType: "contract IErc20",
        name: "",
        type: "address",
      },
      {
        internalType: "contract IAggregatorV3",
        name: "",
        type: "address",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    name: "getNormalizedPrice",
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
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    name: "getPrice",
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
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pricePrecision",
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
    name: "pricePrecisionScalar",
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
        internalType: "contract IErc20",
        name: "asset",
        type: "address",
      },
      {
        internalType: "contract IAggregatorV3",
        name: "feed",
        type: "address",
      },
    ],
    name: "setFeed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50600080546001600160a01b031916339081178255604051909182917f5c486528ec3e3f0ea91181cff8116f02bfa350e03b8b6f12e00765adbb5af85c908290a350610ba3806100616000396000f3fe608060405234801561001057600080fd5b50600436106100be5760003560e01c80638da5cb5b11610076578063d29d44ee1161005b578063d29d44ee14610187578063dbb674801461019a578063ed917cee146101a657600080fd5b80638da5cb5b14610154578063ad5c6ec51461017f57600080fd5b80634b3f2889116100a75780634b3f288914610118578063524f38891461012057806386ac03e01461014157600080fd5b80633b39a51c146100c357806340b1eb1014610103575b600080fd5b6100d66100d13660046108c2565b6101b9565b604080516001600160a01b0394851681529390921660208401521515908201526060015b60405180910390f35b61011661011136600461095a565b61024c565b005b610116610468565b61013361012e3660046108c2565b6104f2565b6040519081526020016100fa565b61011661014f3660046108c2565b6105fd565b600054610167906001600160a01b031681565b6040516001600160a01b0390911681526020016100fa565b610133600881565b610116610195366004610993565b61076a565b6101336402540be40081565b6101336101b43660046108c2565b61082c565b60008060006001846040516101ce91906109e0565b908152604051908190036020018120546001600160a01b0316906001906101f69087906109e0565b9081526040519081900360200181206001908101546001600160a01b0316916102209088906109e0565b90815260405190819003602001902060010154919450925060ff600160a01b9091041690509193909250565b6000546001600160a01b031633146102915760005460405163cc6bdb1d60e01b81526001600160a01b0390911660048201523360248201526044015b60405180910390fd5b6000826001600160a01b03166395d89b416040518163ffffffff1660e01b8152600401600060405180830381865afa1580156102d1573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102f991908101906109fc565b90506000826001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa15801561033b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061035f9190610a73565b905060088160ff161461038957818160405163d0dc36dd60e01b8152600401610288929190610ac2565b6040518060600160405280856001600160a01b03168152602001846001600160a01b03168152602001600115158152506001836040516103c991906109e0565b908152604080519182900360209081018320845181546001600160a01b039182166001600160a01b0319909116178255918501516001909101805495909301511515600160a01b0274ffffffffffffffffffffffffffffffffffffffffff1990951690821617939093179055848216918616907f647a720046a42b3b8e46b4e518d1e66a98da8898542a3ac043f788fa6209e86290600090a350505050565b6000546001600160a01b031633146104a85760005460405163cc6bdb1d60e01b81526001600160a01b039091166004820152336024820152604401610288565b600080546040516001600160a01b03909116907f5c486528ec3e3f0ea91181cff8116f02bfa350e03b8b6f12e00765adbb5af85c908390a3600080546001600160a01b0319169055565b600060018260405161050491906109e0565b9081526040519081900360200190206001015460ff600160a01b90910416610541578160405163a915259360e01b81526004016102889190610ae7565b600060018360405161055391906109e0565b9081526040805191829003602001822060010154633fabe5a360e21b835290516001600160a01b039091169163feaf968c9160048083019260a09291908290030181865afa1580156105a9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105cd9190610b19565b509193508392505050806105f6578360405163237ea70960e01b81526004016102889190610ae7565b9392505050565b6000546001600160a01b0316331461063d5760005460405163cc6bdb1d60e01b81526001600160a01b039091166004820152336024820152604401610288565b60018160405161064d91906109e0565b9081526040519081900360200190206001015460ff600160a01b9091041661068a578060405163a915259360e01b81526004016102889190610ae7565b600060018260405161069c91906109e0565b9081526040519081900360200181206001908101546001600160a01b031692506000916106ca9085906109e0565b908152604051908190036020018120546001600160a01b031691506001906106f39085906109e0565b90815260405190819003602001812080546001600160a01b0319168155600101805474ffffffffffffffffffffffffffffffffffffffffff191690556001600160a01b0383811691908316907f321e6a7a83f180e8fbc42d0c925ac22ca151900bdb6bb6b67b678e9dcca6e1d690600090a3505050565b6000546001600160a01b031633146107aa5760005460405163cc6bdb1d60e01b81526001600160a01b039091166004820152336024820152604401610288565b6001600160a01b0381166107d157604051634208fc5d60e01b815260040160405180910390fd5b600080546040516001600160a01b03808516939216917f5c486528ec3e3f0ea91181cff8116f02bfa350e03b8b6f12e00765adbb5af85c91a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b600080610838836104f2565b9050600061084b6402540be40083610b69565b949350505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561089257610892610853565b604052919050565b600067ffffffffffffffff8211156108b4576108b4610853565b50601f01601f191660200190565b6000602082840312156108d457600080fd5b813567ffffffffffffffff8111156108eb57600080fd5b8201601f810184136108fc57600080fd5b803561090f61090a8261089a565b610869565b81815285602083850101111561092457600080fd5b81602084016020830137600091810160200191909152949350505050565b6001600160a01b038116811461095757600080fd5b50565b6000806040838503121561096d57600080fd5b823561097881610942565b9150602083013561098881610942565b809150509250929050565b6000602082840312156109a557600080fd5b81356105f681610942565b60005b838110156109cb5781810151838201526020016109b3565b838111156109da576000848401525b50505050565b600082516109f28184602087016109b0565b9190910192915050565b600060208284031215610a0e57600080fd5b815167ffffffffffffffff811115610a2557600080fd5b8201601f81018413610a3657600080fd5b8051610a4461090a8261089a565b818152856020838501011115610a5957600080fd5b610a6a8260208301602086016109b0565b95945050505050565b600060208284031215610a8557600080fd5b815160ff811681146105f657600080fd5b60008151808452610aae8160208601602086016109b0565b601f01601f19169290920160200192915050565b604081526000610ad56040830185610a96565b905060ff831660208301529392505050565b6020815260006105f66020830184610a96565b805169ffffffffffffffffffff81168114610b1457600080fd5b919050565b600080600080600060a08688031215610b3157600080fd5b610b3a86610afa565b9450602086015193506040860151925060608601519150610b5d60808701610afa565b90509295509295909350565b6000816000190483118215151615610b9157634e487b7160e01b600052601160045260246000fd5b50029056fea164736f6c634300080c000a";

type ChainlinkOperatorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ChainlinkOperatorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ChainlinkOperator__factory extends ContractFactory {
  constructor(...args: ChainlinkOperatorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ChainlinkOperator";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ChainlinkOperator> {
    return super.deploy(overrides || {}) as Promise<ChainlinkOperator>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ChainlinkOperator {
    return super.attach(address) as ChainlinkOperator;
  }
  connect(signer: Signer): ChainlinkOperator__factory {
    return super.connect(signer) as ChainlinkOperator__factory;
  }
  static readonly contractName: "ChainlinkOperator";
  public readonly contractName: "ChainlinkOperator";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ChainlinkOperatorInterface {
    return new utils.Interface(_abi) as ChainlinkOperatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ChainlinkOperator {
    return new Contract(address, _abi, signerOrProvider) as ChainlinkOperator;
  }
}
