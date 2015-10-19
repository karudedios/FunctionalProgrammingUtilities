"use strict";

import { compose, curry, pipe } from './../lib/bundle';

describe("Default Functional Utilities: ", () => {
  describe("compose", () => {
    it("should throw when non-function/s received", () => {
      let f0 = (a) => 2 * a;

      let f1 = compose.bind(null, f0, null);
      expect(f1).toThrow("Functions only allowed");
    });

    it("should throw when called with no functions", () => {
      expect(compose).toThrow("Must specify functions to compose");
    });

    it("should allow for 2 functions to be composed", () => {
      let a = 5;
      let f0 = (a) => 2 * a * a;
      let f1 = (a) => a / a;

      let composition = compose(f1, f0);
      expect(composition(a)).toBe(2, "Looks like the functions were not composed correctly.");
    });

    it("should allow for +2 functions to be composed", () => {
      let a = 5;
      let r = Math.sqrt(Math.pow((a * 2) / 4, 3));

      let f0 = a => a * 2;
      let f1 = a => a / 4;
      let f2 = a => Math.pow(a, 3);
      let f3 = a => Math.sqrt(a);

      let composition = compose(f0, f1, f2, f3);
      expect(composition(a)).toBe(r, "composition did not work LTR"); 
    });
  });

  describe("curry", () => {
    it("should throw for non function", () => {
      let c0 = () => curry(undefined);
      expect(c0).toThrow(`Expected Function instead got ${typeof undefined}`);
    });

    it("should curry function of n combined length of parameters", () => {
      let higherOrderSum = (a) => (b) => (c) => a + b + c;

      let cHOSum = curry(higherOrderSum);
      expect(cHOSum(1, 2, 3)).toBe(higherOrderSum(1)(2)(3));

      let sum = (a, b, c) => a + b + c;
      let cSum = curry(sum);
      expect(cSum(1)(2)(3)).toBe(sum(1, 2, 3));
    });
  });

  describe("pipe", () => {
    it("should return same provided value if no function given", () => {
      let v = 10;
      let funcs = [];
      let r = pipe(v, ...funcs);

      expect(r).toBe(v);
    });

    it("should return the result of all evaluations when called with n functions", () => {      
      let a = 5;
      let r = Math.sqrt(Math.pow((a * 2) / 4, 3));

      let f0 = a => a * 2;
      let f1 = a => a / 4;
      let f2 = a => Math.pow(a, 3);
      let f3 = a => Math.sqrt(a);

      expect(pipe(a, f0, f1, f2, f3)).toBe(r);
    });    
  });
});