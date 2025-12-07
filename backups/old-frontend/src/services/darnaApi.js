import axios from "axios";
import { API_BASES } from "../config/apiConfig";

const base = API_BASES.darna;

const url = (path) => `${base}${path}`;

export const darnaApi = {
  register: (payload) => axios.post(url("/auth/register"), payload).then((res) => res.data),
  login: (payload) => axios.post(url("/auth/login"), payload).then((res) => res.data),
  profile: (token) =>
    axios
      .get(url("/auth/profile"), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data),
  getProperties: () => axios.get(url("/properties")).then((res) => res.data),
  getProperty: (id) => axios.get(url(`/properties/${id}`)).then((res) => res.data),
};

