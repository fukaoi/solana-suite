function curry(targetFn, existingArgs) {
  return function(args) {
    const totalArgs = [existingArgs, args]
    if(totalArgs.length >= targetFn.length) {
      return targetFn(totalArgs)
    }
    return curry(targetFn, totalArgs)
  }
}


function aaa(a, b, c) {
  console.log(a, b, c);
}

const curryEx = curry(aaa);

curryEx()();
