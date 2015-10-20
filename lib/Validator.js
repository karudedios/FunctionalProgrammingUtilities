"use strict";

export default (() => {
  class Validator {
    constructor(value) {
      Object.assign(this, { value });
    }

    where(predicate) {
      return predicate(this.value)
        ? Validator.valid(this.value)
        : Validator.invalid(this.value);
    }

    static from(v) {
      return new Validator(v);
    }

    static valid(v) {
      return new Valid(v);
    }

    static invalid(v) {
      return new Invalid(v);
    }
  }

  class Valid extends Validator {
    apply(func) {
      return func(this.value);
    }

    match({ valid }) {
      return valid(this.value);
    }
  }

  class Invalid extends Validator {
    apply() {
      return this.value;
    }

    match({ invalid }) {
      return invalid(this.value);
    }

    where() {
      return this;
    }
  }

  return { Validator };
})();