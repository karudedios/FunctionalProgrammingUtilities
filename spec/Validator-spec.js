import { Validator } from './../libs/bundle';

describe("[Validator] Functional Utilities: ", () => {
  it("should wrap a value", () => {
    let n = 10;
    let v = Validator.from(n);

    expect(typeof v).not.toBe(typeof undefined, "Should not be undefined");
    expect(typeof v).not.toBe(typeof n, "Should have different types");
  });

  it("should choose valid path when valid", () => {
    let n = 20;
    let v = Validator.from(n);

    v.where(x => x % 2 === 0).match({
      valid: (v) => expect(v).toBe(n),
      invalid: (v) => expect(v).toBe(false, "The path should have been valid")
    });
  });

  it("should choose invalid path when invalid", () => {
    let n = 20;
    let v = Validator.from(n);

    v.where(x => x % 3 === 0).match({
      valid: (v) => expect(v).toBe(false, "The path should have been invalid"),
      invalid: (v) => expect(v).toBe(n)
    });
  });

  it("should apply a function if the wrapper is valid", () => {
    let n = 10;

    let v = Validator.from(n).where(x => x % 2 === 0).apply(x => x * 2);
    expect(v).toBe(20);

    let i = Validator.from(n).where(x => x % 3 === 0).apply(x => x * 2);
    expect(i).toBe(n);
  });
});