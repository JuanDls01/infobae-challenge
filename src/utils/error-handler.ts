/**
 * Handles various types of errors and returns a readable message.
 *
 * This function takes an unknown error and attempts to interpret it:
 * - If the error is `null` or `undefined`, it returns `"unknown error"`.
 * - If the error is a `string`, it returns the string directly.
 * - If the error is an instance of `Error`, it returns the error's message.
 * - If the error type is unrecognized, it returns a stringified version of the object.
 *
 * @param {unknown} error - The error to handle.
 * @returns {string} A human-readable error message.
 */
export function errorHandler(error: unknown) {
  if (error == null) {
    return "unknown error";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}
