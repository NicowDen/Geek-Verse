import User from "../models/user.model.js";
import { logError } from "../utils/logger.utils.js";
import { getErrors } from "../utils/errors.utils.js";
import { getCurrentDate } from "../utils/date.utils.js";
import { formatUser, formatUsers } from "../utils/user.utils.js";

const create = async (email, pseudo, password, role) => {
  let result = null;
  let error = `${getCurrentDate()} - user.dao -> create : `;
  try {
    const user = new User({ email, pseudo, password, role }); // { _id: 823462384 }
    const createdUser = await user.save();
    // const checkPseudo = await User.findOne({ pseudo }).exec();

    console.log(`createdUser = ${createdUser}`);
    error = createdUser ? null : error + `user not found`;
    result = createdUser ? formatUser(createdUser) : null;
  } catch (e) {
    error = e.errors ? error + getErrors(e.errors) : error + `${e.message}`;
  } finally {
    error ? logError(error) : () => {};
    return result;
  }
};

const readByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email }).exec();
    return user ? formatUser(user) : null;
  } catch (e) {
    logError(`user.dao - readByEmail : ${e.message}`);
    return null;
  }
};

const readAll = async () => {
  try {
    const users = await User.find();
    return users ? formatUsers(users) : null;
  } catch (e) {
    logError(`user.dao - readAll : ${e.message}`);
    return null;
  }
};

const readById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user ? formatUser(user) : null;
  } catch (e) {
    logError(`user.dao - readById : ${e.message}`);
    return null;
  }
};

const updateTheme = async (userId, themeSelected) => {
  try {
    const user = await User.findById(userId);
    user.theme = themeSelected;
    const updatedUser = await user.save();
    if (!updatedUser) return null;
    const updatedTheme = updatedUser.theme;
    return updatedTheme;
  } catch (e) {
    logError(`user.dao - updateTheme : ${e.message}`);
    return null;
  }
};

const updateAdminRole = async (email) => {
  try {
    const newAdmin = await User.updateOne({ email: email }, { role: "ADMIN" });
    return newAdmin ? newAdmin : null;
  } catch (e) {
    logError(`user.dao - updateAdminRole : ${e.message}`);
    return null;
  }
};

export const UserDAO = {
  create: create,
  readByEmail,
  readAll,
  readById,
  updateTheme,
  updateAdminRole,
};
