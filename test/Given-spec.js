"use strict";

import { given } from './../lib/bundle';

let assert = require('assert');

describe("Given", () => {
  it("should return wrapped value when calling .out", () => {
    let r = given(9);
    assert.strictEqual(r.out(), 9, "Should have returned 5");
  });

  it("should not have its behavior affected if value is undefined", () => {
    let r = given(undefined).when(u => u === undefined).then(() => 5).otherwise(() => 10);
    assert.strictEqual(r.out(), 5, "Should have returned 5");
  });

  it("should apply `then` when condition is matched", () => {
    let r = given(2).when(two => two === 2).then(two => two * 2);
    assert.strictEqual(r.out(), 4, "Should have multiplied two by two");
  });

  it("should apply `otherwise` when condition is not matched", () => {
    let r = given(3).when(three => three === 2).then(three => three + 2).otherwise(three => three * 2);
    assert.strictEqual(r.out(), 6, "Should have multiplied three by two");
  });

  it("should only follow the matched path when using `then` or `otherwise`", () => {
    let c = given(10).when(ten => ten === 10).then(ten => ten * ten).otherwise(() => { throw "This should've been ignored." });
    assert.strictEqual(c.out(), 100, "The expected path was not followed.");
  });

  it("should apply the function regardless", () => {
    let c = given(5).when(() => false).then(f => f * 5).apply(f => f / 5);
    assert.strictEqual(c.out(), 1, "should have ignored `then` and executed `apply`");
  });
});