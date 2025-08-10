// src/api/index.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: '/', // 使用相对路径，通过 proxy 转发到 localhost:3000
  timeout: 1000,
});

instance.interceptors.request.use(
  config => {
    console.log('Request:', config);
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response.data;
  },
  error => {
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

interface LoginResponse {
  role: string;
}

export const login = async (username: string, password: string): Promise<string> => {
  try {
    const response: LoginResponse = await instance.post('/users/login', { username, password });
    return response.role;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
};

interface WordsResponse {
  data: Array<{
    id: string;
    title: string;
    content: string;
  }>;
}

export const fetchWords = async (): Promise<WordsResponse['data']> => {
  try {
    const response: WordsResponse = await instance.get('/words');
    return response.data;
  } catch (error) {
    console.error('Fetch words failed:', error);
    throw new Error('Fetch words failed');
  }
};

interface WordResponse {
  id: string;
  title: string;
  content: string;
}

export const fetchWordById = async (id: string): Promise<WordResponse> => {
  try {
    const response: WordResponse = await instance.get(`/words/${id}`);
    return response;
  } catch (error) {
    console.error('Fetch word by ID failed:', error);
    throw new Error('Fetch word by ID failed');
  }
};