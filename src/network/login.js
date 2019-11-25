import axios from './axios'

export function getLoginData(loginData) {
  return axios({
    method: 'post',
    url: '/login',
    data: {
      username: loginData.username,
      password: loginData.password
    }
  })
}