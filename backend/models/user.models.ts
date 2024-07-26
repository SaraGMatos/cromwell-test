export const createUser = (
  username: string,
  email: string,
  password: string
) => {
  return {
    username: username,
    email: email,
    password: password,
  };
};
