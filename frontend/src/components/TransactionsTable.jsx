import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Select, MenuItem, InputLabel, FormControl, Pagination
} from '@mui/material';
import api from '../api';

const TransactionsTable = ({month}) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchTransactions();
  }, [page, search, month]);

  const fetchTransactions = async () => {
    const response = await api.get('/api/products/transactions', {
      params: { page, perPage, search, month }
    });
    setTransactions(response.data.products);
    setTotal(response.data.total);
  };

  return (
    <div style={{ marginBottom: '3rem', marginTop: '6rem' }}>
      <TextField
        label="Search transactions"
        fullWidth
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Date of Sale</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map(transaction => (
              <TableRow key={transaction._id}>
                <TableCell>{transaction.title}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.price}</TableCell>
                <TableCell>{new Date(transaction.dateOfSale).toLocaleDateString()}</TableCell>
                <TableCell>{transaction.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(total / perPage)}
        page={page}
        onChange={(e, value) => setPage(value)}
        style={{ marginTop: '1rem' }}
      />
    </div>
  );
};

export default TransactionsTable;
