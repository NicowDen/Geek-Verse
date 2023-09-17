import { UserDAO } from "../daos/user.dao.js";
import { jwtSign } from "../utils/jwt.utils.js";
import { stringIsFilled } from "../utils/string.utils.js";
import { omit, omitMulti } from "../utils/object.utils.js";
import { adminsList, metaAdminsList } from "../constants/adminsWhiteList.js";
import { metaAdminCheckByUserId } from "./adminCheck.controller.js";

const signUp = async (req, res) => {
  const pseudo = req.body.pseudo;
  const email = req.body.email;
  const password = req.body.password;
  let role = "";

  const userExists = UserDAO.readByEmail(email);
  if (userExists === true)
    return res.status(403).json({ message: `email_already_exist` });

  if (metaAdminsList.includes(email)) {
    role = "META_ADMIN";
  } else if (adminsList.includes(email)) {
    role = "ADMIN";
  } else {
    role = "MEMBER";
  }

  const user = await UserDAO.create(email, pseudo, password, role);
  const token = jwtSign(user.id);

  res
    .status(201)
    .json({ message: "user_created", user: omit(user, "password"), token });
};

const signIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!stringIsFilled(email) || !stringIsFilled(password)) {
    return res
      .status(404)
      .json({ message: "email or password is not correct" });
  }
  const user = await UserDAO.readByEmail(email);
  if (user && user.password === password) {
    const token = jwtSign(user.id);
    res.status(200).json({
      message: "ok",
      user: omitMulti(user, ["password", "id"]),
      token,
    });
  } else {
    res.status(401).json({ message: "login_failed" });
  }
};

const getUserInfos = async (req, res) => {
  const userId = req.body.userId;
  const user = await UserDAO.readById(userId);
  if (!user) return res.status(400).json({ message: `can't retrieve user` });
  res.status(200).json({ user: omit(user, "password") });
};

const read = async (req, res) => {
  const users = await UserDAO.readAll();
  if (!users) return res.status(400).json({ message: `can't retrieve users` });
  res.status(200).json({ users });
};

const updateTheme = async (req, res) => {
  const userId = req.body.userId;
  const themeSelected = req.body.themeSelected;
  const theme = await UserDAO.updateTheme(userId, themeSelected);
  if (!theme) return res.status(400).json({ message: `cannot_update_theme` });
  res.status(200).json({ message: `theme was successfully updated`, theme });
};

const updateAdmin = async (req, res) => {
  const email = req.body.email;
  const authorisation = await metaAdminCheckByUserId(req.body.userId);
  if (authorisation === false) {
    return res
      .status(401)
      .json({ message: "user is not authorized", authorisation });
  }
  const user = await UserDAO.readByEmail(email);
  if (!user)
    return res
      .status(400)
      .json({ message: `this user does not exists`, user: email });
  if (user.role === "ADMIN" || user.role === "META_ADMIN") {
    return res
      .status(400)
      .json({ message: `this user is already admin`, user: user.email });
  }
  const newAdmin = await UserDAO.updateAdminRole(email);
  if (!newAdmin)
    return res
      .status(400)
      .json({ message: `cannot_update_user`, user: user.email });
  res
    .status(200)
    .json({ message: `user was successfully updated`, user: user.email });
};

export const UserController = {
  signUp,
  read,
  signIn,
  updateTheme,
  getUserInfos,
  updateAdmin,
};
