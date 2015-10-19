"use strict";

import { given } from './../lib/bundle';

let assert = require('assert');

describe("[Given] Functional Utilities: ", () => {
  it("should not have its behavior affected if value is falsy", () => {
    let v;
    let r = given(v).when(u => u === undefined).then(() => 5).otherwise(() => 10);

    assert.strictEqual(r.out(), 5, "Should have returned 5");
  });

  it("should apply `then` when condition is matched", () => {
    let v = 2;
    let r = given(v).when(two => two === 2).then(two => two * 2);
    assert.strictEqual(r.out(), 4, "Should have multiplied two by two");
  });

  it("should apply `otherwise` when condition is not matched", () => {
    let v = 3;
    let r = given(v).when(two => two === 2).then(two => two * 2);
    assert.strictEqual(r.out(), 3, "Should have not multiplied two by two");
  });

  it("should only follow the matched path when using `then` or `otherwise`", () => {
    let v = 10;
    let p = given(v);
    let c = p.when(ten => ten === v).then(ten => ten * ten).otherwise(() => { throw "This should've been ignored." });

    assert.strictEqual(c.out(), v * v, "The expected path was not followed.");
  });

  it("should apply the function regardless", () => {
    let v = 5;
    let p = given(v);
    let c = p.when(() => false).then(f => f * 5).apply(f => f / 5);
    assert.strictEqual(c.out(), 1, "should have ignored `then` and executed `apply`");
  });
});