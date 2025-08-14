import bcrypt from "bcrypt";

const generateHash = (password: string): string => {
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
  return bcrypt.hashSync(password, saltRounds);
};

const compareHash = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};

export const hashHelper = {
  generateHash,
  compareHash,
};
