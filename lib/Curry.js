"use strict";

export default (() => {
  const curry = (fn) => {
    if (!fn) throw `Expected fn to be truthy instead was ${typeof fn !== 'undefined' ? fn.constructor.name : fn}`;
    if (!(fn instanceof Function)) throw `Expected Function instead got ${typeof fn}`;

    let curried = (...args) => {
      let _ref;
      
      let _curried = (...args2) => curried(...args.concat(args2));
      Object.defineProperty(_curried, 'arity', { value: curried.arity - 1, writable: true });

      return (args.length >= curried.arity || curried.arity <= 0)
        ? (_ref = fn(...args)) instanceof Function
          ? curry(_ref)(...args.slice(fn.length))
          : _ref
        : _curried;
    };

    Object.defineProperty(fn, 'arity', { value: (fn.arity || fn.length), writable: true });
    Object.defineProperty(curried, 'arity', { value: fn.arity, writable: true });    
    
    return curried;
  };

  return { curry };
})();