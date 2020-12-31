/**
 * Helper function for exhausive type checking
 * 
 * @param value never happen
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};