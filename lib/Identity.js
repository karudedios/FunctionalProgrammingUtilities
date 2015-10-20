"use strict";

export default (() => {
  let identity = (v) => v;
  
  return {
    id: identity,
    identity
  };
})();