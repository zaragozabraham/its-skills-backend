import { CreateUserDTO } from './../models/user';
import {
  LoginDTO,
  LoginEmailDTO,
  LoginUsernameDTO,
  UserModel,
} from "../models/user";

import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "";

export const login = async ({ password, email, userName }: LoginDTO) => {
  if (!password)
    return {
      status: 400,
      error: "password is required",
    };

  let user = undefined;

  if (email) {
    user = await loginEmail({ email, password });
  } else if (userName) {
    user = await loginUserName({ userName, password });
  } else {
    return {
      status: 400,
      error: "you have to send email or userName field",
    };
  }

  if (!user)
    return {
      status: 404,
      error: "user not found",
    };

  const token = jwt.sign(
    {
      _id: user._id,
      email,
      rol: user.type,
    },
    SECRET_KEY,
    {
      expiresIn: "3h",
    }
  );

  user = {
    userName: user.userName,
    token,
  };

  return user;
};

const loginEmail = async ({ email, password }: LoginEmailDTO) => {
  const user = await UserModel.findOne({ email });

  if (!user || user.password !== password) return;

  return user;
};

const loginUserName = async ({ userName, password }: LoginUsernameDTO) => {
  const user = await UserModel.findOne({ userName });

  if (!user || user.password !== password) return;

  return user;
};

export const getAllUsers = async () => {
  try {
    return await UserModel.find();
  } catch (err) {
    return {
      status: 500,
      error: err,
    };
  }
};

export const getUserByID = async (id: string) => {
  try {
      return await UserModel.findById(id);
  } catch (err) {
      return {
          status: 500,
          error: err
      }
  }
};

export const createUser = async ({ userName, email, password, type }: CreateUserDTO) => {
  if (!userName || !email || !password || !type)
  return {
    status: 400,
    error: 'Todos los campos son obligatorios.'
  };
  try {
    return await UserModel.create({
      userName, email, password, type
    });
  } catch (error) {
    return {
      status: 500,
      error: error
    };
  }
}