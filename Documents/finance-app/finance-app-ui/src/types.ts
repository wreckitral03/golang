export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  note: string;
  created_at: string;
}

export interface Summary {
  total_income: number;
  total_expenses: number;
  balance: number;
}