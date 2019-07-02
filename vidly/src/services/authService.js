import httpService from "./httpService";
import jwtDecode from "jwt-decode";
import config from "../config.json";

httpService.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await httpService.post(`${config.apiEndpoint}/auth`, {
    email,
    password
  });
  localStorage.setItem("token", jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}
export function logout() {
  localStorage.removeItem("token");
}
export function getJwt() {
  return localStorage.getItem("token");
}
export function getCurrentUser() {
  const jwt = localStorage.getItem("token");
  if (!jwt) {
    return "";
  }
  return jwtDecode(jwt);
}
