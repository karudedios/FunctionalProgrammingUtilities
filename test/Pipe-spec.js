"use strict";

import { pipe } from './../lib/bundle';

let assert = require('assert');

describe("Pipe", () => {
  it("should not misbehave when `null` or `undefined` is passed as value", () => {
    let f0 = n => n * 5;
    let f1 = n => n ? n : Infinity;

    assert.equal(pipe(undefined, f0, f1), Infinity);
  });

  it("should return same provided value if no function given", () => {
    assert.strictEqual(pipe(10), 10);
  });

  it("should return the result of all evaluations when called with n functions", () => {
    let f0 = a => a * 2;
    let f1 = a => a / 4;
    let f2 = a => Math.pow(a, 3);
    let f3 = a => Math.sqrt(a);

    assert.strictEqual(pipe(5, f0, f1, f2, f3), Math.sqrt(Math.pow((5 * 2) / 4, 3)));
  });    
});