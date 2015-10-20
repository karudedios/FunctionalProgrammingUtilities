"use strict";

import { Validator } from './../lib/bundle';

let assert = require('assert');

describe("[Validator] Functional Utilities: ", () => {
  it("should wrap a value", () => {
    let n = 10;
    let v = Validator.from(n);

    assert.notStrictEqual(typeof v, typeof undefined, "Should not be undefined");
    assert.notStrictEqual(typeof v, typeof n, "Should have different types");
  });

  it("should choose valid path when valid", () => {
    let n = 20;
    let v = Validator.from(n);

    v.where(x => x % 2 === 0).match({
      valid: (v) => assert.strictEqual(v, n),
      invalid: (v) => assert.strictEqual(v, false, "The path should have been valid")
    });
  });

  it("should choose invalid path when invalid", () => {
    let n = 20;
    let v = Validator.from(n);

    v.where(x => x % 3 === 0).match({
      valid: (v) => assert.strictEqual(v, false, "The path should have been invalid"),
      invalid: (v) => assert.strictEqual(v, n)
    });
  });

  it("should apply a function if the wrapper is valid", () => {
    let v = Validator.from(10).where(x => x % 2 === 0).apply(x => x * 2);
    assert.strictEqual(v, 20);
  });

  it("should not apply a function if the wrapper is invalid", () => {
    let v = Validator.from(10).where(x => x % 3 === 0).apply(x => x * 2);
    assert.strictEqual(v, 10);
  });

  it("should ignore `where` clause if the wrapper is invalid", () => {
    let v = Validator.from(5).where(x => !x).where(x => x % 5 === 0).apply(x => x + 2);
    assert.strictEqual(v, 5);
  });
});