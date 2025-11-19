import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/router";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  // @ts-ignore
  const router = useRouter();
  const [user, setUser] = useState(
    typeof window !== "undefined" ? localStorage?.getItem("user") : null
  );
  const [defaultStation, setDefaultStation] = useState(
    typeof window !== "undefined"
      ? localStorage?.getItem("defaultStation")
      : null
  );
  const [auth, setAuth] = useState(null);
  const [profile, setProfile] = useState(
    typeof window !== "undefined" ? localStorage?.getItem("profile") : null
  );
  const [userData, setUserData] = useState({});
  const [userSession, setUserSession] = useState({});
  const [forgotPassword, setForgotPassword] = useState(null);

  const saveUser = (user) => {
    if (user && user.accessToken) {
      const username = user.accessToken.payload.username;
      const userId = user.accessToken.payload.sub;
      const roles = user.accessToken.payload["cognito:groups"];

      setUser(JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("username", username);
      localStorage.setItem("userId", userId);
      localStorage.setItem("roles", roles);
    }
  };

  const saveProfile = async (data) => {
    setProfile(data);
    localStorage.setItem("profile", JSON.stringify(data));
    localStorage.setItem("fullName", JSON.stringify(data.username));
    localStorage.setItem("email", JSON.stringify(data.email));
  };

  const getProfile = () => {
    if (profile != null) {
      if (typeof profile === "string") {
        return JSON.parse(profile);
      }
      return profile;
    }
  };

  const clear = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    localStorage.removeItem("profile");
    localStorage.removeItem("fullName");
    setUser(null);
    setProfile(null);
    setAuth(null);
  };
  const saveDefaultStation = (obj) => {
    setDefaultStation(JSON.stringify(obj));
    localStorage.setItem("defaultStation", JSON.stringify(obj));
  };

  
  function formateJson(str) {
    if (typeof str === "object") {
      return str;
    }
    try {
      return JSON.parse(str);
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    // localStorage.setItem("facit_authUsername", user);
    const st =
      typeof window !== "undefined"
        ? localStorage?.getItem("defaultStation")
        : null;

    if (router.pathname != "/") {
      if (user) {
        const obj = formateJson(user);
        setAuth(obj);
        const include = ["/auth/login"];
        if (include.indexOf(router.pathname) > -1) {
          router.push(`/admin/dashboard`);
        }
      } else {
        const exclude = ["/"];
        if (
          router.pathname.indexOf("auth") == -1 &&
          exclude.indexOf(router.pathname) === -1
        ) {
          router.push("/auth/login");
        }
      }
    }

    // if (user !== '') {
    // 	setUserData(getUserDataWithUsername(user));
    // } else {
    // 	setUserData({});
    // }
  }, [user]);


 
  const value = useMemo(
    () => ({
      user,
      setUser,
      setUserSession,
      userData,
      userSession,
      setForgotPassword,
      forgotPassword,
      saveUser,
      clear,
      saveProfile,
      getProfile,
      saveDefaultStation,
      isLoggedIn,
    }),
    [user, userData]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
