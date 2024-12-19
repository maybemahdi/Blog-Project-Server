import { User } from "../user/user.model";
import { IRegisterUser } from "./auth.interface";

const registerUserIntoDB = async (payload: IRegisterUser) => {
  const result = await User.create(payload);
  return {
    _id: result?._id,
    name: result?.name,
    email: result?.email,
  };
};

export const AuthService = {
  registerUserIntoDB,
};
