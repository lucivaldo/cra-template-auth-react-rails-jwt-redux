import axios from 'axios';

const backendInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export function setAuthorizationToken(token: string) {
  backendInstance.defaults.headers.common.Authorization = `Token ${token}`;
}

type Post = {
  id: number;
  title: string;
};

export async function getPosts() {
  const { data } = await backendInstance.get<Post[]>('/posts');
  return data;
}
