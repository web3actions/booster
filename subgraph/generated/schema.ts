// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Deposit extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Deposit entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Deposit entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Deposit", id.toString(), this);
  }

  static load(id: string): Deposit | null {
    return store.get("Deposit", id) as Deposit | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }

  get sender(): string {
    let value = this.get("sender");
    return value.toString();
  }

  set sender(value: string) {
    this.set("sender", Value.fromString(value));
  }

  get issue(): string {
    let value = this.get("issue");
    return value.toString();
  }

  set issue(value: string) {
    this.set("issue", Value.fromString(value));
  }

  get withdrawalRound(): BigInt {
    let value = this.get("withdrawalRound");
    return value.toBigInt();
  }

  set withdrawalRound(value: BigInt) {
    this.set("withdrawalRound", Value.fromBigInt(value));
  }
}

export class Sender extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Sender entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Sender entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Sender", id.toString(), this);
  }

  static load(id: string): Sender | null {
    return store.get("Sender", id) as Sender | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get deposits(): Array<string> | null {
    let value = this.get("deposits");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set deposits(value: Array<string> | null) {
    if (value === null) {
      this.unset("deposits");
    } else {
      this.set("deposits", Value.fromStringArray(value as Array<string>));
    }
  }
}

export class Issue extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Issue entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Issue entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Issue", id.toString(), this);
  }

  static load(id: string): Issue | null {
    return store.get("Issue", id) as Issue | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get deposits(): Array<string> | null {
    let value = this.get("deposits");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set deposits(value: Array<string> | null) {
    if (value === null) {
      this.unset("deposits");
    } else {
      this.set("deposits", Value.fromStringArray(value as Array<string>));
    }
  }

  get withdrawalRound(): BigInt {
    let value = this.get("withdrawalRound");
    return value.toBigInt();
  }

  set withdrawalRound(value: BigInt) {
    this.set("withdrawalRound", Value.fromBigInt(value));
  }
}
