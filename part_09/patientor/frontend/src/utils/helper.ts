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

export const getISODateString = (date: string | undefined | null): string | null => {
  return date ? new Date(date).toISOString().split("T")[0] : null;
};