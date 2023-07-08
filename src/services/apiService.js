import axios from 'axios';

const INSTAPLUS_API_URL = 'http://localhost:3000';
const INSTAGRAM_API_URL = 'https://api.instagram.com'

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

  create_publication(formData) {
    return axios.post(`${INSTAPLUS_API_URL}/api/publications/save_file`, formData);
  },
  get_publications() {
    return axios.get(`${INSTAPLUS_API_URL}/api/publications/find`);
  },
  get_publication(id) {
    return axios.get(`${INSTAPLUS_API_URL}/api/publications/find/${id}`);
  },
  delete_publication(id) {
    return axios.delete(`${INSTAPLUS_API_URL}/api/publications/delete/${id}`);
  },
  update_publication(data) {
    return axios.post(`${INSTAPLUS_API_URL}/api/publications/update`, data, { headers: { "Content-Type": "application/json" } });
  },
  authorize() {
    return axios.post(`${INSTAPLUS_API_URL}/api/instagram/oauth`);
  },
};