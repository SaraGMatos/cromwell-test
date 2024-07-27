import axios from "axios";

const cromwellApi = axios.create({
  baseURL: "http://localhost:3000",
});

export const createUser = (
  username: string,
  email: string,
  password: string
) => {
  return cromwellApi.post("/user/register", {
    username: username,
    email: email,
    password: password,
  });
};

export const loginUser = (email: string, password: string) => {
  return cromwellApi.post("/user/login", {
    email: email,
    password: password,
  });
};

export const getUser = (id: string | undefined) => {
  return cromwellApi.get(`/user/${id}`);
};
