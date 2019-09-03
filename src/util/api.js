import Axios from "axios";

const BASE_URL = "http://18.223.162.119:3008/api";

export const getResponse = async params => {
  const data = await Axios.get(`${BASE_URL}${params}`).then(({ data }) => data);
  return data;
};

export const postResponse = (url, data) =>
  Axios.post(`${BASE_URL}${url}`, data)
    .then(res => res)
    .catch(error => Promise.reject(error));
