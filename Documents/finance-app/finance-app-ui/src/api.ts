import axios from 'axios';
import { Transaction, Summary } from './types';

const API_BASE = import.meta.env.VITE_API_BASE;

const api = axios.create({
  baseURL: API_BASE,
});

// ✅ Always attach token dynamically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Auto-logout on 401
api.interceptors.response.use(undefined, (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const { data } = await api.get('/api/transactions');
  return data;
};

export const fetchSummary = async (): Promise<Summary> => {
  const { data } = await api.get('/api/summary');
  return data;
};

export const createTransaction = async (
  transaction: Omit<Transaction, 'id' | 'created_at'>
) => {
  const { data } = await api.post('/api/transactions', transaction);
  return data;
};

export const updateTransaction = async (
  id: string,
  transaction: Partial<Transaction>
) => {
  const { data } = await api.put(`/api/transactions/${id}`, transaction);
  return data;
};

export const deleteTransaction = async (id: string) => {
  await api.delete(`/api/transactions/${id}`);
};

export default api;
