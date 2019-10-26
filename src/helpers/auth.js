import { api } from '@helpers';
import get from 'lodash-es/get';

export async function authorization() {
  try {
    const response = await api.login();
    const authKey = get(response, 'data.etm_auth_key', null);
    sessionStorage.setItem('etm-auth-key', authKey);
    return authKey;
  }
  catch (err) {
    console.error(err)
  }
}
