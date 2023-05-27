import axios from 'axios';

const INSTAPLUS_API_URL = 'http://localhost:3000';

export default {
  login_user(data) {
    const params = {
      email: data.email,
      password: data.password,
    };
    return axios.post(`${INSTAPLUS_API_URL}/api/users/login`, params, { headers: { "Content-Type": "application/json" } });
  },
  create_user(data) {
    const params = {
      firstName: data.name,
      lastName: data.lastName,
      email: data.email,
      birthDate: data.birthDate,
      password: data.password,
    };

    return axios.post(`${INSTAPLUS_API_URL}/api/users/create`, params, { headers: { "Content-Type": "application/json" } });
  },
};