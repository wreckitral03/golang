import { useState } from 'react';
import {
  Paper,
  TextInput,
  Select,
  Button,
  Group,
} from '@mantine/core';
import { NumericFormat } from 'react-number-format'; // ✅ correct import
import { createTransaction } from '../api';

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

          <NumericFormat
            required
            label="Amount"
            value={amount}
            onValueChange={(values) => {
              setAmount(values.floatValue ?? '');
            }}
            thousandSeparator="."
            decimalSeparator=","
            prefix="Rp "
            customInput={TextInput}
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
