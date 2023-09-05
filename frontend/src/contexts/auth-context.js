import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import { API_URL } from "../utils/misc";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      const token = window.sessionStorage.getItem("token");
      isAuthenticated = token != null && token != "";
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = state.user;

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = async () => {
    // try {
    //   window.sessionStorage.setItem("authenticated", "true");
    // } catch (err) {
    //   console.error(err);
    // }
    // const user = {
    //   id: "5e86809283e28b96d2d38537",
    //   avatar: "/assets/avatars/avatar-marcus-finn.png",
    //   name: "Wolfgang Wang",
    //   email: "wolfgangwang@hotmail.ca",
    // };
    // dispatch({
    //   type: HANDLERS.SIGN_IN,
    //   payload: user,
    // });
    await signIn("wolfgangwang@hotmail.ca", 123456);
  };

  const signIn = async (email, password) => {
    const user = {
      email,
      password,
    };

    const response = await fetch(API_URL() + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (response.status == 422 || response.status == 401) throw new Error(data.message);
    if (!response.ok) throw new Error("Did not pass anthentication. ");

    // data.user.avatar = "/assets/avatars/avatar-marcus-finn.png";

    try {
      window.sessionStorage.setItem("token", data.token);
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: data.user,
    });
  };

  const signUp = async (email, name, password) => {
    const newUser = {
      email,
      name,
      password,
    };

    const response = await fetch(API_URL() + "/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (response.status == 422 || response.status == 401) return response;
    if (!response.ok) throw new Error("Did not pass anthentication. ");

    // to-do: manage token from response
    // localStorage.setItem("token", response.token);
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
