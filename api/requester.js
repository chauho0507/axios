import axios from "axios";
import { BASE_URL } from "../constants/defaultValue";

export function setupAxios() {
  axios.defaults.baseURL = `${BASE_URL}/api/v1/`;
  axios.defaults.headers.common["Content-Type"] = "application/json";
}

export function setAxiosToken(token) {
  axios.defaults.headers.common.Authorization = "Bearer " + token;
}

export function setAxiosCompanyId(companyId) {
  axios.defaults.headers.common["companyId"] = companyId;
}

export function removeAxiosToken() {
  axios.defaults.headers.common.Authorization = "";
}

const responseBody = (res) => res.data;

const requester = {
  get: (url, params, config = {}) =>
    axios
      .get(url, {
        params,
        ...config,
      })
      .then(responseBody),

  post: (url, data, config = {}) =>
    axios.post(url, data, config).then(responseBody),
  put: (url, data, config = {}) =>
    axios.put(url, data, config).then(responseBody),
  delete: (url, data) => axios.delete(url, { data }).then(responseBody),
};

export default requester;
