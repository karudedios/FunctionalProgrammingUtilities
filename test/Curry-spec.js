"use strict";

import { curry } from './../lib/bundle';

let assert = require('assert');

describe("Curry", () => {
  it("should throw for non function", () => {
    let c0 = () => curry(undefined);

    assert.throws(c0, `Expected Function instead got ${typeof undefined}`);
  });

  it("should curry higher order functions", () => {
    let sum = (a) => (b) => (c) => a + b + c;
    let cSum = curry(sum);

    assert.strictEqual(cSum(1, 2, 3), sum(1)(2)(3));
  });

  it("should curry regular functions", () => {
    let sum = (a, b, c) => a + b + c;
    let cSum = curry(sum);

    assert.strictEqual(cSum(1)(2)(3), sum(1, 2, 3));
  });
});