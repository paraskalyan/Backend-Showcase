import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/AppError.js";
import type { Signup } from "./auth.types.js";
import argon2 from 'argon2'

export const signup = async (data: Signup) => {
  const { email, name, username, password } = data;
  if (!email || !name || !username || !password) {
    throw new AppError("All fields are required", 400);
  }
  if(password.length < 8){
    throw new AppError("Password must be 8 characters long", 400);
  }

  const hashedPassword = await argon2.hash(password);

  const newUser = await prisma.user.create({
    data:{
        email: email,
        name: name,
        username: username,
        password: hashedPassword
    }
  })
  return {message: 'success', user : newUser}
};

export const login = async () => {};

export const logout = async () => {};
