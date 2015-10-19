"use strict";

export default (() => {
  function compose(...funcs) {
    if (!funcs.length) throw "Must specify functions to compose";
    if (funcs.some((x) => !(x instanceof Function))) throw "Functions only allowed";
    return funcs.reduce((composed, toCompose) => ((...args) => toCompose(composed(...args))), funcs.shift());
  }

  function pipe(value, ...funcs){
    return funcs.reduce((v, func) => func(v), value);
  }

  function curry(fn) {
    if (!(fn instanceof Function)) throw `Expected Function instead got ${typeof fn}`;

    let curried = (...args) => {
      let _ref;
      
      let _curried = (...args2) => curried.apply(this, args.concat(args2));
      Object.defineProperty(_curried, 'arity', { value: curried.arity - 1, writable: true });

      return (args.length >= curried.arity || curried.arity <= 0)
        ? (_ref = fn.apply(this, args)) instanceof Function
          ? curry(_ref).apply(this, args.slice(fn.length))
          : _ref
        : _curried;
    };

    Object.defineProperty(fn, 'arity', { value: (fn.arity || fn.length), writable: true });
    Object.defineProperty(curried, 'arity', { value: fn.arity, writable: true });    
    return curried;
  }


  return { compose, pipe, curry };
})();