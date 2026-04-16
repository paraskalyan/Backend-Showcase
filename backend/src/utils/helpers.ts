export const isEmail = (str: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
};

export const isValidUsername = (str: string) => {
  return /^[a-zA-Z0-9_]{3,20}$/.test(str);
};
