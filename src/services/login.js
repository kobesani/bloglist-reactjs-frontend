import axios from "axios";
const baseUrl = "/api/login";

import errors from "../utils/errors";

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      throw new errors.IncorrectCredentialsError(
        error.response.data["error"]
      );
    }
  }
);

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return (response.data);
};

export default { login };
