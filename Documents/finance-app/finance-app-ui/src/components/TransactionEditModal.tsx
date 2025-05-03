import {
  Modal,
  TextInput,
  NumberInput,
  Select,
  Button,
  Group,
} from '@mantine/core';
import { useState } from 'react';
import { Transaction } from '../types';
import { updateTransaction } from '../api';

interface TransactionEditModalProps {
  transaction: Transaction;
  onClose: () => void;
  onSuccess: () => void;
}

export default function TransactionEditModal({
  transaction,
  onClose,
  onSuccess,
}: TransactionEditModalProps) {
  const [type, setType] = useState(transaction.type);
  const [amount, setAmount] = useState(transaction.amount);
  const [note, setNote] = useState(transaction.note);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTransaction(transaction.id, {
      type,
      amount,
      note,
    });
    onSuccess();
  };

  return (
    <Modal opened onClose={onClose} title="Edit Transaction">
      <form onSubmit={handleSubmit}>
        <Select
          required
          label="Type"
          value={type}
          onChange={(value) => setType(value as 'income' | 'expense')}
          data={[
            { value: 'income', label: 'Income' },
            { value: 'expense', label: 'Expense' },
          ]}
          mb="md"
        />

        <NumberInput
          required
          label="Amount"
          value={amount}
          onChange={(value) => setAmount(value as number)}
          min={0}
          precision={0}
          step={1000}
          parser={(value) => value?.replace(/[^\d]/g, '') || ''}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value || ''))
              ? `Rp${parseFloat(value).toLocaleString('id-ID')}`
              : 'Rp0'
          }
          mb="md"
        />

        <TextInput
          required
          label="Note"
          value={note}
          onChange={(e) => setNote(e.currentTarget.value)}
          mb="md"
        />

        <Group position="right">
          <Button variant="subtle" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </Group>
      </form>
    </Modal>
  );
}
