// Validates if the provided string is a valid email address using a regular expression.
export const isEmail = (str: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
};

// Validates if the provided string is a valid password based on the following criteria:
// - Minimum length of 8 characters
// - At least one uppercase letter
export const isValidUsername = (str: string) => {
  return /^[a-zA-Z0-9_]{3,20}$/.test(str);
};

// Ensures that the provided value is an object. If it's not, returns an empty object.
export const ensureObject = (value: any) => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value;
  }
  return {};
};