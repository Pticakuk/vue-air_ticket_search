import axios from 'axios/index';
import config from '../config'

export function login() {
  return axios.get(`https://crm.etm-system.com/api/login/${config.app_id}`);
}

export function search({ data, authKey }) {
  return axios.post('https://crm.etm-system.com/api/air/search', data,
    { headers: { 'etm-auth-key': authKey }});
}

export function offers({ requestId, authKey }) {
  return axios.get(`https://crm.etm-system.com/api/air/offers?request_id=${requestId}&currency=USD`,
    { headers: { 'etm-auth-key': authKey }});
}
