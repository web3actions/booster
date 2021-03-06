// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class CancelEvent extends ethereum.Event {
  get params(): CancelEvent__Params {
    return new CancelEvent__Params(this);
  }
}

export class CancelEvent__Params {
  _event: CancelEvent;

  constructor(event: CancelEvent) {
    this._event = event;
  }

  get depositId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class DepositEvent extends ethereum.Event {
  get params(): DepositEvent__Params {
    return new DepositEvent__Params(this);
  }
}

export class DepositEvent__Params {
  _event: DepositEvent;

  constructor(event: DepositEvent) {
    this._event = event;
  }

  get depositId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get sender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get issueId(): string {
    return this._event.parameters[2].value.toString();
  }

  get value(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get withdrawalRound(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class WithdrawEvent extends ethereum.Event {
  get params(): WithdrawEvent__Params {
    return new WithdrawEvent__Params(this);
  }
}

export class WithdrawEvent__Params {
  _event: WithdrawEvent;

  constructor(event: WithdrawEvent) {
    this._event = event;
  }

  get issueId(): string {
    return this._event.parameters[0].value.toString();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get withdrawalRound(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Deposits__githubWorkflowsResult {
  value0: string;
  value1: Address;

  constructor(value0: string, value1: Address) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromString(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    return map;
  }
}

export class Deposits__getDepositByIdResult {
  value0: Address;
  value1: string;
  value2: BigInt;
  value3: BigInt;

  constructor(value0: Address, value1: string, value2: BigInt, value3: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    return map;
  }
}

export class Deposits extends ethereum.SmartContract {
  static bind(address: Address): Deposits {
    return new Deposits("Deposits", address);
  }

  githubWorkflowSigner(): Address {
    let result = super.call(
      "githubWorkflowSigner",
      "githubWorkflowSigner():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_githubWorkflowSigner(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "githubWorkflowSigner",
      "githubWorkflowSigner():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  githubWorkflows(param0: string): Deposits__githubWorkflowsResult {
    let result = super.call(
      "githubWorkflows",
      "githubWorkflows(string):(string,address)",
      [ethereum.Value.fromString(param0)]
    );

    return new Deposits__githubWorkflowsResult(
      result[0].toString(),
      result[1].toAddress()
    );
  }

  try_githubWorkflows(
    param0: string
  ): ethereum.CallResult<Deposits__githubWorkflowsResult> {
    let result = super.tryCall(
      "githubWorkflows",
      "githubWorkflows(string):(string,address)",
      [ethereum.Value.fromString(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Deposits__githubWorkflowsResult(
        value[0].toString(),
        value[1].toAddress()
      )
    );
  }

  getDepositIdsBySender(): Array<BigInt> {
    let result = super.call(
      "getDepositIdsBySender",
      "getDepositIdsBySender():(uint256[])",
      []
    );

    return result[0].toBigIntArray();
  }

  try_getDepositIdsBySender(): ethereum.CallResult<Array<BigInt>> {
    let result = super.tryCall(
      "getDepositIdsBySender",
      "getDepositIdsBySender():(uint256[])",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigIntArray());
  }

  getDepositById(_depositId: BigInt): Deposits__getDepositByIdResult {
    let result = super.call(
      "getDepositById",
      "getDepositById(uint256):(address,string,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(_depositId)]
    );

    return new Deposits__getDepositByIdResult(
      result[0].toAddress(),
      result[1].toString(),
      result[2].toBigInt(),
      result[3].toBigInt()
    );
  }

  try_getDepositById(
    _depositId: BigInt
  ): ethereum.CallResult<Deposits__getDepositByIdResult> {
    let result = super.tryCall(
      "getDepositById",
      "getDepositById(uint256):(address,string,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(_depositId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Deposits__getDepositByIdResult(
        value[0].toAddress(),
        value[1].toString(),
        value[2].toBigInt(),
        value[3].toBigInt()
      )
    );
  }

  getIssueBalance(_issueId: string): BigInt {
    let result = super.call(
      "getIssueBalance",
      "getIssueBalance(string):(uint256)",
      [ethereum.Value.fromString(_issueId)]
    );

    return result[0].toBigInt();
  }

  try_getIssueBalance(_issueId: string): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getIssueBalance",
      "getIssueBalance(string):(uint256)",
      [ethereum.Value.fromString(_issueId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getIssueWithdrawalRound(_issueId: string): BigInt {
    let result = super.call(
      "getIssueWithdrawalRound",
      "getIssueWithdrawalRound(string):(uint256)",
      [ethereum.Value.fromString(_issueId)]
    );

    return result[0].toBigInt();
  }

  try_getIssueWithdrawalRound(_issueId: string): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getIssueWithdrawalRound",
      "getIssueWithdrawalRound(string):(uint256)",
      [ethereum.Value.fromString(_issueId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _signer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class RegisterWorkflowCall extends ethereum.Call {
  get inputs(): RegisterWorkflowCall__Inputs {
    return new RegisterWorkflowCall__Inputs(this);
  }

  get outputs(): RegisterWorkflowCall__Outputs {
    return new RegisterWorkflowCall__Outputs(this);
  }
}

export class RegisterWorkflowCall__Inputs {
  _call: RegisterWorkflowCall;

  constructor(call: RegisterWorkflowCall) {
    this._call = call;
  }

  get _hash(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class RegisterWorkflowCall__Outputs {
  _call: RegisterWorkflowCall;

  constructor(call: RegisterWorkflowCall) {
    this._call = call;
  }
}

export class SetSignerCall extends ethereum.Call {
  get inputs(): SetSignerCall__Inputs {
    return new SetSignerCall__Inputs(this);
  }

  get outputs(): SetSignerCall__Outputs {
    return new SetSignerCall__Outputs(this);
  }
}

export class SetSignerCall__Inputs {
  _call: SetSignerCall;

  constructor(call: SetSignerCall) {
    this._call = call;
  }

  get _signer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetSignerCall__Outputs {
  _call: SetSignerCall;

  constructor(call: SetSignerCall) {
    this._call = call;
  }
}

export class DepositCall extends ethereum.Call {
  get inputs(): DepositCall__Inputs {
    return new DepositCall__Inputs(this);
  }

  get outputs(): DepositCall__Outputs {
    return new DepositCall__Outputs(this);
  }
}

export class DepositCall__Inputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }

  get _issueId(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class DepositCall__Outputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }
}

export class CancelCall extends ethereum.Call {
  get inputs(): CancelCall__Inputs {
    return new CancelCall__Inputs(this);
  }

  get outputs(): CancelCall__Outputs {
    return new CancelCall__Outputs(this);
  }
}

export class CancelCall__Inputs {
  _call: CancelCall;

  constructor(call: CancelCall) {
    this._call = call;
  }

  get _depositId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class CancelCall__Outputs {
  _call: CancelCall;

  constructor(call: CancelCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get _issueId(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _runId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _signature(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}
