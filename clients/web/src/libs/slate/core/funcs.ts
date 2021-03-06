type OptionalFuncArray<Args extends any[], Return> = Array<
  ((...args: Args) => Return) | undefined
>

/**
 * Iterates over each function in the array and returns the result if
 * `shouldReturnResult` is truthy.
 */
export function returnFirst<Args extends any[], Return>(
  args: Args,
  funcs: OptionalFuncArray<Args, Return>,
  shouldReturnResult: (result: Return) => boolean
): Return | null {
  for (const func of funcs) {
    if (func == null) continue
    const result = func(...args)
    if (shouldReturnResult(result)) return result
  }
  return null
}

/**
 * Iterates over each function in the array and returns the result of a the
 * first function to not be null or undefined.
 */
export function returnFirstDefined<Args extends any[], Return>(
  args: Args,
  funcs: OptionalFuncArray<Args, Return>
) {
  return returnFirst(args, funcs, r => r != null)
}

/**
 * Iterates over each function in the array exit if a function returns false.
 */
export function returnFirstFalse<Args extends any[]>(
  args: Args,
  funcs: OptionalFuncArray<Args, void | true | false | undefined | null>
) {
  return returnFirst(args, funcs, r => r === false)
}
