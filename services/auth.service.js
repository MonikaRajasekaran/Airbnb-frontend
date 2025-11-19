import helpers from "../helpers/APIHelper";
import { METHOD_TYPES, PATHS } from "../config/constants";
import Router from "next/router";

export function register(data) {
  return helpers.callApi(METHOD_TYPES.POST, PATHS.AUTH.REGISTER, data, {});
}

export function login(data) {
  return helpers.callApi(METHOD_TYPES.POST, PATHS.AUTH.LOGIN, data, {});
}

export function verifyUser(data) {
  return helpers.callApi(METHOD_TYPES.PATCH, PATHS.AUTH.VERIFY, data, {});
}

export function forceUpdate(data) {
  return helpers.callApi(METHOD_TYPES.POST, PATHS.AUTH.FORCE_UPDATE, data, {});
}

export function emailTask(data) {
  return helpers.callApi(METHOD_TYPES.POST, PATHS.EMAIL.EMAILTASK, data, {});
}

export function logoutUser() {
  localStorage.clear();
}

export function updatePassword(data) {
  return helpers.callApi(
    METHOD_TYPES.PATCH,
    PATHS.AUTH.UPDATE_PASSWORD,
    data,
    {}
  );
}

export function forgotPassword(data) {
  return helpers.callApi(
    METHOD_TYPES.POST,
    PATHS.AUTH.FORGOT_PASSWORD,
    data,
    {}
  );
}

export function resetPassword(data) {
  return helpers.callApi(
    METHOD_TYPES.PATCH,
    PATHS.AUTH.RESET_PASSWORD,
    data,
    {}
  );
}

export function isAuthenticated() {
  if (
    localStorage.getItem("accessToken") === null ||
    localStorage.getItem("refreshToken") === null
  ) {
    return false;
  }
  const user = localStorage.getItem("user");
  return JSON.parse(user);
}
export function setSession(data) {
  localStorage.setItem("Session", data);
}

export function setToken(access, refresh) {
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
}

export function storeUser(data) {
  for (const [key, value] of Object.entries(data)) {
    localStorage.setItem(key, value);
  }
  localStorage.setItem("user", JSON.stringify(data));
}



export function saveUser(user) {
  if (user && user.accessToken) {
    const username = user.accessToken.payload.username;
    const userId = user.accessToken.payload.sub;
    const roles = user.accessToken.payload["cognito:groups"];

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);
    localStorage.setItem("roles", roles);
  }
};

 export function isLoggedIn  () {
    const user =
      typeof window !== "undefined" ? localStorage?.getItem("user") : null;
    // console.log(user);
    if (!user) {
      Router.push("/");
    }
  };
