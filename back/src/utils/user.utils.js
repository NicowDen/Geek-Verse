export const formatUser = (user) => {
  return {
    id: user._id,
    email: user.email,
    pseudo: user.pseudo,
    password: user.password,
    role: user.role,
    theme: user.theme,
  };
};

export const formatUsers = (users) => {
  return users.map(formatUser);
};
