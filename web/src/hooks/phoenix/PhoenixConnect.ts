import axios from "axios";
import {
  SLING_ENDPOINT_URL,
  SLING_SIGN_IN_PATH,
  AXIOS_OPTIONS,
} from "../../constants";

export function connect(email: string, password: string) {
  return axios.post(
    `${SLING_ENDPOINT_URL}${SLING_SIGN_IN_PATH}`,
    {
      email: email,
      password: password,
    },
    AXIOS_OPTIONS
  );
}
