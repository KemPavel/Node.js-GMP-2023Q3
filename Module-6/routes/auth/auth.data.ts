import {User} from "../../schema/User";

// Only for testing purposes
export const getUsers = async () => {
  return await User.find();
};

export const getUser = async (email) => {
  return await User.findOne({ email });
};

export const createUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};
