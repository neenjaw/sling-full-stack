import axios from 'axios'
import {
  SLING_ENDPOINT_URL,
  SLING_SIGN_IN_PATH,
  AXIOS_OPTIONS,
} from '../../constants'

export function connect(email: string, password: string, opts: {} = {}) {
  return axios.post(
    `${SLING_ENDPOINT_URL}${SLING_SIGN_IN_PATH}`,
    {
      email: email,
      password: password,
    },
    Object.assign({}, AXIOS_OPTIONS, opts)
  )
}
