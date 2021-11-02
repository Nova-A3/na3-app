import type { BatchId, BatchIdType } from "../types";

export class Na3BatchId implements BatchId {
  readonly originalValue: string;

  private _value: string;
  private _type: BatchIdType = "invalid";
  private _hasBeenFixed = false;
  private _isBrazilian = false;
  private _isMexican = false;
  private _isValid = false;

  constructor(value: string) {
    this.originalValue = value;
    this._value = value;

    if (this.validateBrazilian()) {
      this.initialize("brazil");
      return;
    }
    if (this.validateMexican()) {
      this.initialize("mexico");
      return;
    }

    this._value = this.fixAgainstFormat("brazil");
    if (this.validateBrazilian()) {
      this.initialize("brazil", { fixed: true });
      return;
    }

    this._value = this.fixAgainstFormat("mexico");
    if (this.validateMexican()) {
      this.initialize("mexico", { fixed: true });
      return;
    }
  }

  get value(): string {
    return this._value;
  }
  private set value(value: string) {
    this._value = value;
  }

  get type(): BatchIdType {
    return this._type;
  }
  private set type(type: BatchIdType) {
    this._type = type;
  }

  get hasBeenFixed(): boolean {
    return this._hasBeenFixed;
  }
  private set hasBeenFixed(hasBeenFixed: boolean) {
    this._hasBeenFixed = hasBeenFixed;
  }

  get isBrazilian(): boolean {
    return this._isBrazilian;
  }
  private set isBrazilian(isBrazilian: boolean) {
    this._isBrazilian = isBrazilian;
  }

  get isMexican(): boolean {
    return this._isMexican;
  }
  private set isMexican(isMexican: boolean) {
    this._isMexican = isMexican;
  }

  get isValid(): boolean {
    return this._isValid;
  }
  private set isValid(isValid: boolean) {
    this._isValid = isValid;
  }

  private initialize(type: BatchIdType, options?: { fixed: boolean }): void {
    this.type = type;
    this.isBrazilian = type === "brazil";
    this.isMexican = type === "mexico";
    this.isValid = type !== "invalid";
    this.hasBeenFixed = !!options?.fixed;
  }

  private fixAgainstFormat(format: "brazil" | "mexico"): string {
    if (format === "brazil") {
      return (
        this.originalValue.substring(0, 4) +
        "-" +
        this.originalValue.substring(4, 7) +
        "-" +
        this.originalValue.substring(7, 12) +
        " " +
        this.originalValue.substring(12)
      );
    } else {
      return (
        "KA-" +
        this.originalValue[1] +
        (this.originalValue[1] === "N" ? "T" : "I") +
        "-" +
        this.originalValue.substring(2)
      );
    }
  }

  private validateBrazilian(): boolean {
    return /^([c-fikr][a-dfgk-mx][0-3]\d-?\d{3}-?[2-4]\d[0-3]\d{2} ?[a-g])$/i.test(
      this.value
    );
  }

  private validateMexican(): boolean {
    return /^(ka-?((nt)|(ci))-?\d+)$/i.test(this.value);
  }
}
