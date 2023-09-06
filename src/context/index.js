import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { request } from "../api/request";

const JawadAuth = createContext(null);

JawadAuth.displayName = "JawadAuthContext";

function reducer(state, action) {
  switch (action.type) {
    case "login": {
      Cookies.set("_casher_token", action.value.token);
      Cookies.set("_isAuth", true);
      return {
        isAuth: true,
        user: action.value.user,
        token: Cookies.get("_casher_token"),
      };
    }
    case "logout": {
      Cookies.remove("_casher_token");
      Cookies.remove("_profile");
      Cookies.remove("_isAuth");
      return {
        ...state,
        isAuth: false,
        user: "",
        token: "",
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function JawadAuthControllerProvider({ children }) {
  const initialState = {
    user: Cookies.get("_profile"),
    isAuth: Cookies.get("_isAuth"),
    token: Cookies.get("_casher_token"),
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <JawadAuth.Provider value={value}> {children} </JawadAuth.Provider>;
}

function useJawadAuthController() {
  const context = useContext(JawadAuth);

  if (!context) {
    throw new Error(
      "useSoftUIController should be used inside the SoftUIControllerProvider."
    );
  }

  return context;
}

const login = (dispatch, value) => {
  dispatch({
    type: "login",
    value: value,
  });
};

const logout = (dispatch, value) => {
  dispatch({ type: "logout" });
};

const RequireAuth = ({ children }) => {
  const [controller, dispatch] = useContext(JawadAuth);
  const { isAuth } = controller;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
    request({
      url: "/testToken",
    })
      .then((res) => {})
      .catch((e) => {
        if (e.response.status !== 200) {
          logout(dispatch);
          navigate("/auth/login");
        }
      });
  });

  return children;
};

export {
  JawadAuthControllerProvider,
  useJawadAuthController,
  login,
  logout,
  RequireAuth,
};
