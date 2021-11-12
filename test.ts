function curry(targetFn, …existingArgs) {
  return function(…args) {
    const totalArgs = […existingArgs, …args]
    if(totalArgs.length >= targetFn.length) {
      return targetFn(…totalArgs)
    }
    return curry(targetFn, …totalArgs)
  }
}


