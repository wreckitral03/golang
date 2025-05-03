import { useState } from 'react';
import {
  Table,
  Select,
  TextInput,
  ActionIcon,
  Group,
  Text,
} from '@mantine/core';
import { Transaction } from '../types';
import { deleteTransaction } from '../api';
import TransactionEditModal from './TransactionEditModal';
import { formatRupiah } from '../utils/formatCurrency'; // ✅ Import Rupiah formatter

interface TransactionTableProps {
  transactions: Transaction[];
  onTransactionUpdate: () => void;
}

export default function TransactionTable({
  transactions,
  onTransactionUpdate,
}: TransactionTableProps) {
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const filteredTransactions = transactions
    .filter((t) => !typeFilter || t.type === typeFilter)
    .filter((t) =>
      search ? t.note.toLowerCase().includes(search.toLowerCase()) : true
    );

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      await deleteTransaction(id);
      onTransactionUpdate();
    }
  };

  return (
    <>
      <Group position="apart" mb="md">
        <Select
          value={typeFilter}
          onChange={setTypeFilter}
          placeholder="Filter by type"
          clearable
          data={[
            { value: 'income', label: 'Income' },
            { value: 'expense', label: 'Expense' },
          ]}
        />
        <TextInput
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </Group>

      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                {new Date(transaction.created_at).toLocaleDateString('id-ID')}
              </td>
              <td>
                <Text color={transaction.type === 'income' ? 'teal' : 'red'}>
                  {transaction.type}
                </Text>
              </td>
              <td>{formatRupiah(transaction.amount)}</td> {/* ✅ Rupiah */}
              <td>{transaction.note}</td>
              <td>
                <Group spacing={0} position="left">
                  <ActionIcon
                    onClick={() => setEditingTransaction(transaction)}
                    variant="default"
                    size="sm"
                  >
                    ✏️
                  </ActionIcon>
                  <ActionIcon
                    color="red"
                    onClick={() => handleDelete(transaction.id)}
                    variant="default"
                    size="sm"
                  >
                    🗑️
                  </ActionIcon>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {editingTransaction && (
        <TransactionEditModal
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
          onSuccess={() => {
            setEditingTransaction(null);
            onTransactionUpdate();
          }}
        />
      )}
    </>
  );
}
