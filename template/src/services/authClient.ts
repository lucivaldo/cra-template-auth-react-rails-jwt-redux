import axios from 'axios';
import { User } from '../store/authSlice';

const authInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
});

type GetTokenResponse = {
  usuario: User;
  token: string;
};

const authClient = {
  async getToken(authorizationCode: string) {
    const { data } = await authInstance.post<GetTokenResponse>('/auth/token', {
      code: authorizationCode,
    });

    return data;
  },
};

export default authClient;
