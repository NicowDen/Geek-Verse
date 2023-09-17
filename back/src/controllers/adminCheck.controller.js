//fonctions permettant de contrôler dans le back le rôle de l'utilisateur pour les actions admins.
//ces vérifications sont des compléments, les accès étant contrôlés une première fois côté front via des reducers.
import { UserDAO } from "../daos/user.dao.js";
import { jwtVerify } from "../utils/jwt.utils.js";

export const adminCheckByToken = async (token) => {
  const userId = jwtVerify(token);
  const user = await UserDAO.readById(userId);
  return user && (user.role === "META_ADMIN" || user.role === "ADMIN")
    ? true
    : false;
};

export const adminCheckByUserId = async (userId) => {
  const user = await UserDAO.readById(userId);
  return user && (user.role === "META_ADMIN" || user.role === "ADMIN")
    ? true
    : false;
};

export const metaAdminCheckByUserId = async (userId) => {
  const user = await UserDAO.readById(userId);
  return user && user.role === "META_ADMIN" ? true : false;
};
