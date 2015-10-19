"use strict";

import { compose, curry, pipe } from './../lib/bundle';

let assert = require('assert');

describe("Default Functional Utilities: ", () => {
  describe("compose", () => {
    it("should throw when non-function/s received", () => {
      let f0 = (a) => 2 * a;

      let f1 = compose.bind(null, f0, null);
      assert.throws(f1, "Functions only allowed");
    });

    it("should throw when called with no functions", () => {
      assert.throws(compose, "Must specify functions to compose");
    });

    it("should allow for 2 functions to be composed", () => {
      let a = 5;
      let f0 = (a) => 2 * a * a;
      let f1 = (a) => a / a;

      let composition = compose(f1, f0);
      assert.strictEqual(composition(a), 2, "Looks like the functions were not composed correctly.");
    });

    it("should allow for +2 functions to be composed", () => {
      let a = 5;
      let r = Math.sqrt(Math.pow((a * 2) / 4, 3));

      let f0 = a => a * 2;
      let f1 = a => a / 4;
      let f2 = a => Math.pow(a, 3);
      let f3 = a => Math.sqrt(a);

      let composition = compose(f0, f1, f2, f3);
      assert.strictEqual(composition(a), r, "composition did not work LTR"); 
    });
  });

  describe("curry", () => {
    it("should throw for non function", () => {
      let c0 = () => curry(undefined);
      assert.throws(c0, `Expected Function instead got ${typeof undefined}`);
    });

    it("should curry function of n combined length of parameters", () => {
      let higherOrderSum = (a) => (b) => (c) => a + b + c;

      let cHOSum = curry(higherOrderSum);
      assert.strictEqual(cHOSum(1, 2, 3), higherOrderSum(1)(2)(3));

      let sum = (a, b, c) => a + b + c;
      let cSum = curry(sum);
      assert.strictEqual(cSum(1)(2)(3), sum(1, 2, 3));
    });
  });

  describe("pipe", () => {
    it("should return same provided value if no function given", () => {
      let v = 10;
      let funcs = [];
      let r = pipe(v, ...funcs);

      assert.strictEqual(r, v);
    });

    it("should return the result of all evaluations when called with n functions", () => {      
      let a = 5;
      let r = Math.sqrt(Math.pow((a * 2) / 4, 3));

      let f0 = a => a * 2;
      let f1 = a => a / 4;
      let f2 = a => Math.pow(a, 3);
      let f3 = a => Math.sqrt(a);

      assert.strictEqual(pipe(a, f0, f1, f2, f3), r);
    });    
  });
});