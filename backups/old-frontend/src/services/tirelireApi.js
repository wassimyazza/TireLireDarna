import axios from "axios";
import { API_BASES } from "../config/apiConfig";

const base = API_BASES.tirelire;
const url = (path) => `${base}${path}`;

export const tirelireApi = {
  register: (payload) => axios.post(url("/auth/register"), payload).then((res) => res.data),
  login: (payload) => axios.post(url("/auth/login"), payload).then((res) => res.data),
  me: (token) =>
    axios
      .get(url("/users/me"), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data),
};

