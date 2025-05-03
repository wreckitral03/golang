import { useState } from 'react';
import {
  Paper,
  TextInput,
  NumberInput,
  Select,
  Button,
  Group,
} from '@mantine/core';
import { createTransaction } from '../api';
import { formatRupiah } from '../utils/formatCurrency'; // ✅ centralized formatter

interface TransactionFormProps {
  onSuccess: () => void;
}

export default function TransactionForm({ onSuccess }: TransactionFormProps) {
  const [type, setType] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | ''>(0);
  const [note, setNote] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !amount) return;

    await createTransaction({
      type: type as 'income' | 'expense',
      amount: Number(amount),
      note,
    });

    setType(null);
    setAmount(0);
    setNote('');
    onSuccess();
  };

  return (
    <Paper shadow="xs" p="md" mb="xl">
      <form onSubmit={handleSubmit}>
        <Group grow>
          <Select
            required
            label="Type"
            placeholder="Select type"
            value={type}
            onChange={setType}
            data={[
              { value: 'income', label: 'Income' },
              { value: 'expense', label: 'Expense' },
            ]}
          />

          <NumberInput
            required
            label="Amount"
            value={amount}
            onChange={setAmount}
            min={0}
            precision={0}
            step={1000}
            parser={(value) => value?.replace(/[^\d]/g, '') || ''}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value || ''))
                ? formatRupiah(parseFloat(value))
                : 'Rp0'
            }
          />

          <TextInput
            required
            label="Note"
            value={note}
            onChange={(e) => setNote(e.currentTarget.value)}
            placeholder="Enter a note"
          />

          <Button type="submit" style={{ marginTop: 'auto' }}>
            Add Transaction
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
