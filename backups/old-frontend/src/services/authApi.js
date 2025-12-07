import axios from "axios";
import { API_BASES } from "../config/apiConfig";

const base = API_BASES.auth;

const buildUrl = (path) => `${base}${path}`;

export const authApi = {
  register: (payload) => axios.post(buildUrl("/register"), payload).then((res) => res.data),
  login: (payload) => axios.post(buildUrl("/login"), payload).then((res) => res.data),
  validateToken: (token) =>
    axios.post(buildUrl("/validate"), { token }).then((res) => res.data),
  sendValidationEmail: (email) =>
    axios.post(buildUrl("/message/validate"), { email }).then((res) => res.data),
  requestReset: (email) =>
    axios.post(buildUrl("/message/reset"), { email }).then((res) => res.data),
  resetPassword: (payload) =>
    axios.post(buildUrl("/reset"), payload).then((res) => res.data),
  profile: (token) =>
    axios
      .get(buildUrl("/profile"), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data),
  googleStartUrl: (state) => {
    const url = new URL(buildUrl("/google"));
    if (state) {
      url.searchParams.set("state", state);
    }
    return url.toString();
  },
};

