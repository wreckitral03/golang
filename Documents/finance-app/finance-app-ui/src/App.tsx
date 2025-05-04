import { useState, useEffect } from 'react';
import {
  MantineProvider,
  AppShell,
  Container,
  Loader,
  Center,
} from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TransactionTable from './components/TransactionTable';
import TransactionForm from './components/TransactionForm';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { Transaction, Summary } from './types';
import { fetchTransactions, fetchSummary } from './api';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary>({
    total_income: 0,
    total_expenses: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [transactionsData, summaryData] = await Promise.all([
        fetchTransactions(),
        fetchSummary(),
      ]);
      setTransactions(transactionsData);
      setSummary(summaryData);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadData();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <AppShell>
                  <Container size="xl">
                    {loading ? (
                      <Center mt="xl">
                        <Loader />
                      </Center>
                    ) : (
                      <>
                        <Dashboard summary={summary} transactions={transactions} />
                        <TransactionForm onSuccess={loadData} />
                        <TransactionTable
                          transactions={transactions}
                          onTransactionUpdate={loadData}
                        />
                      </>
                    )}
                  </Container>
                </AppShell>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
