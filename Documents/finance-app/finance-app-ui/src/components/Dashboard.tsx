import {
  Paper,
  Title,
  Text,
  Stack,
  Grid,
} from '@mantine/core';
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
import { useMemo } from 'react';
import { Transaction, Summary } from '../types';
import { formatRupiah } from '../utils/formatCurrency';

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend);

interface DashboardProps {
  summary: Summary;
  transactions: Transaction[];
}

export default function Dashboard({ summary, transactions }: DashboardProps) {
  const chartData = useMemo(() => ({
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Amount',
        data: [summary.total_income, summary.total_expenses],
        backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  }), [summary]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Income vs Expenses',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => formatRupiah(value),
        },
        grid: {
          color: '#eee',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }), []);

  return (
    <Stack spacing="md">
      <Title order={2}>Financial Overview</Title>

      <Grid grow gutter="sm">
        <Grid.Col xs={12} sm={4}>
          <Paper shadow="xs" p="md">
            <Title order={3} size="h5">Income</Title>
            <Text size="xl" color="teal" weight={700}>
              {formatRupiah(summary.total_income)}
            </Text>
          </Paper>
        </Grid.Col>

        <Grid.Col xs={12} sm={4}>
          <Paper shadow="xs" p="md">
            <Title order={3} size="h5">Expenses</Title>
            <Text size="xl" color="red" weight={700}>
              {formatRupiah(summary.total_expenses)}
            </Text>
          </Paper>
        </Grid.Col>

        <Grid.Col xs={12} sm={4}>
          <Paper shadow="xs" p="md">
            <Title order={3} size="h5">Balance</Title>
            <Text
              size="xl"
              weight={700}
              color={summary.balance >= 0 ? 'teal' : 'red'}
            >
              {formatRupiah(summary.balance)}
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>

      <Paper shadow="xs" p="md" style={{ height: 300 }}>
        <Bar data={chartData} options={chartOptions} />
      </Paper>
    </Stack>
  );
}
