import axios from 'axios';
import { Transaction, Summary } from './types';

// Use Vite environment variable
const API_BASE = import.meta.env.VITE_API_BASE;

const api = axios.create({
  baseURL: API_BASE
});

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const { data } = await api.get('/transactions');
  return data;
};

export const fetchSummary = async (): Promise<Summary> => {
  const { data } = await api.get('/summary');
  return data;
};

export const createTransaction = async (
  transaction: Omit<Transaction, 'id' | 'created_at'>
) => {
  const { data } = await api.post('/transactions', transaction);
  return data;
};

export const updateTransaction = async (
  id: string,
  transaction: Partial<Transaction>
) => {
  const { data } = await api.put(`/transactions/${id}`, transaction);
  return data;
};

export const deleteTransaction = async (id: string) => {
  await api.delete(`/transactions/${id}`);
};
