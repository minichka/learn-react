import httpService from "./httpService";
import config from "../config.json";

export function registerUser(user) {
  console.log("register process");
  return httpService.post(`${config.apiEndpoint}/users`, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
