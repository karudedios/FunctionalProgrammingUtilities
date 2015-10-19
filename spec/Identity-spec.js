"use strict";

import { Identity } from './../lib/bundle';

describe("[Identity] Functional Utilities: ", () => {
  it("should return the same provided value if null", () => {
    let v;
    expect(Identity(v)).toBe(v);
  });

  it("should return the same provided value if not null", () => {
    let v = 5;
    expect(Identity(v)).toBe(v);
  });
});