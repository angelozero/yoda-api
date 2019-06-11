export class ValidadorValor {
    constructor(value) {
        this._value = value;
    }

    static of(value) {
        return new ValidadorValor(value);
    }

    isNullValue() {
        return this._value === null || this._value === undefined;
    }

    map(fn) {
        if (this.isNullValue()) {
            return ValidadorValor.of(null);
        }
        return ValidadorValor.of(fn(this._value));
    }

    getValueOrElse() {
        if (this.isNullValue()) {
            return 0;
        }
        return this._value;
    }

    getValueOrElse(value) {
        if (this.isNullValue()) {
            return value;
        }
        return this._value;
    }
}