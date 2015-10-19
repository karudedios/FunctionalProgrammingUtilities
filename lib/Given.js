"use strict";

import { Validator } from './Validator';

export default (() => {
  class Given {
    constructor(value) {
      Object.assign(this, { value });
    }

    when(predicate) {
      return Validator.from(this.value)
        .where(predicate)
        .match({
          valid: Then.create,
          invalid: Otherwise.create
        });
    }

    apply(func) {
      return new Given(func(this.value));
    }

    then() {
      return this;
    }

    otherwise() {
      return this;
    }

    out() {
      return this.value;
    }
  }

  class Then extends Given {
    then(func) {
      return new Given(func(this.value));
    }

    static create(v) {
      return new Then(v);
    }
  }

  class Otherwise extends Given {
    otherwise(func) {
      return new Given(func(this.value));
    }

    static create(v) {
      return new Otherwise(v);
    }
  }

  return {
    given(v) {
      return new Given(v);
    }
  };
})();