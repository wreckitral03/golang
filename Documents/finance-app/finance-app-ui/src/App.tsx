import { useState, useEffect } from 'react';
import { MantineProvider, AppShell, Container } from '@mantine/core';
import Dashboard from './components/Dashboard';
import TransactionTable from './components/TransactionTable';
import TransactionForm from './components/TransactionForm';
import { Transaction, Summary } from './types';
import { fetchTransactions, fetchSummary } from './api';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary>({
    total_income: 0,
    total_expenses: 0,
    balance: 0
  });

  const loadData = async () => {
    const [transactionsData, summaryData] = await Promise.all([
      fetchTransactions(),
      fetchSummary()
    ]);
    setTransactions(transactionsData);
    setSummary(summaryData);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <MantineProvider>
      <AppShell>
        <Container size="xl">
          <Dashboard summary={summary} transactions={transactions} />
          <TransactionForm onSuccess={loadData} />
          <TransactionTable 
            transactions={transactions} 
            onTransactionUpdate={loadData}
          />
        </Container>
      </AppShell>
    </MantineProvider>
  );
}

export default App;