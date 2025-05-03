import { Paper, Title, Group, Text, Stack } from '@mantine/core';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';
import { Transaction, Summary } from '../types';
import { formatRupiah } from '../utils/formatCurrency'; // 👈 Import formatter

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend);

interface DashboardProps {
  summary: Summary;
  transactions: Transaction[];
}

export default function Dashboard({ summary, transactions }: DashboardProps) {
  const chartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Amount',
        data: [summary.total_income, summary.total_expenses],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Stack spacing="md">
      <Title order={2}>Financial Overview</Title>
      
      <Group grow>
        <Paper shadow="xs" p="md">
          <Title order={3}>Income</Title>
          <Text size="xl" color="teal">{formatRupiah(summary.total_income)}</Text>
        </Paper>
        
        <Paper shadow="xs" p="md">
          <Title order={3}>Expenses</Title>
          <Text size="xl" color="red">{formatRupiah(summary.total_expenses)}</Text>
        </Paper>
        
        <Paper shadow="xs" p="md">
          <Title order={3}>Balance</Title>
          <Text size="xl" color={summary.balance >= 0 ? 'teal' : 'red'}>
            {formatRupiah(summary.balance)}
          </Text>
        </Paper>
      </Group>

      <Paper shadow="xs" p="md">
        <Bar data={chartData} options={{ responsive: true }} />
      </Paper>
    </Stack>
  );
}
