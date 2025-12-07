import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { authApi } from "../services/authApi";
import { darnaApi } from "../services/darnaApi";
import { tirelireApi } from "../services/tirelireApi";

const TOKEN_KEYS = {
  auth: "app:authToken",
  darna: "app:darnaToken",
  tirelire: "app:tirelireToken",
};

const getInitialTokens = () => ({
  auth: localStorage.getItem(TOKEN_KEYS.auth) ?? "",
  darna: localStorage.getItem(TOKEN_KEYS.darna) ?? "",
  tirelire: localStorage.getItem(TOKEN_KEYS.tirelire) ?? "",
});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [tokens, setTokens] = useState(getInitialTokens);
  const [profile, setProfile] = useState(null);
  const [darnaProfile, setDarnaProfile] = useState(null);
  const [tirelireProfile, setTirelireProfile] = useState(null);

  const persistToken = (service, value) => {
    if (!TOKEN_KEYS[service]) {
      return;
    }
    if (value) {
      localStorage.setItem(TOKEN_KEYS[service], value);
    } else {
      localStorage.removeItem(TOKEN_KEYS[service]);
    }
  };

  const updateToken = (service, tokenValue) => {
    setTokens((prev) => {
      const next = { ...prev, [service]: tokenValue ?? "" };
      return next;
    });
    persistToken(service, tokenValue);
  };

  const logout = () => {
    Object.keys(TOKEN_KEYS).forEach((service) => persistToken(service, ""));
    setTokens({ auth: "", darna: "", tirelire: "" });
    setProfile(null);
    setDarnaProfile(null);
    setTirelireProfile(null);
  };

  const loginAuth = async (credentials) => {
    const response = await authApi.login(credentials);
    const payload = response?.data ?? response;
    const token = payload?.token ?? payload?.data?.token;
    updateToken("auth", token);
    setProfile(payload?.user ?? payload?.data?.user ?? null);
    return payload;
  };

  const loginDarna = async (credentials) => {
    const response = await darnaApi.login(credentials);
    const payload = response?.data ?? response;
    const token = payload?.data?.token ?? payload?.token;
    updateToken("darna", token);
    setDarnaProfile(payload?.data?.user ?? payload?.user ?? null);
    return payload;
  };

  const loginTirelire = async (credentials) => {
    const response = await tirelireApi.login(credentials);
    const payload = response?.data ?? response;
    const token = payload?.token;
    updateToken("tirelire", token);
    setTirelireProfile(payload?.user ?? null);
    return payload;
  };

  const contextValue = {
    tokens,
    profile,
    darnaProfile,
    tirelireProfile,
    loginAuth,
    loginDarna,
    loginTirelire,
    logout,
    setToken: updateToken,
    setProfile,
    setDarnaProfile,
    setTirelireProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

