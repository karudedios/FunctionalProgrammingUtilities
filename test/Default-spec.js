"use strict";

import { compose, curry, pipe } from './../lib/bundle';

let assert = require('assert');

describe("Default Functional Utilities: ", () => {
  describe("compose", () => {
    it("should throw when non-function/s received", () => {
      let f0 = (a) => 2 * a;
      let f1 = compose.bind(null, f0, 0, 0);

      assert.throws(f1, "Functions only allowed");
    });

    it("should throw when called with no functions", () => {
      assert.throws(compose, "Must specify functions to compose");
    });

    it("should allow for 2 functions to be composed", () => {
      let f0 = (a) => 2 * a * a;
      let f1 = (a) => a / a;
      let composition = compose(f1, f0);

      assert.strictEqual(composition(5), 2, "Looks like the functions were not composed correctly.");
    });

    it("should allow for +2 functions to be composed", () => {
      let f0 = a => a * 2;
      let f1 = a => a / 4;
      let f2 = a => Math.pow(a, 3);
      let f3 = a => Math.sqrt(a);
      let composition = compose(f0, f1, f2, f3);

      assert.strictEqual(composition(5), Math.sqrt(Math.pow((5 * 2) / 4, 3)), "composition did not work LTR"); 
    });
  });

  describe("curry", () => {
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

  describe("pipe", () => {
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
});