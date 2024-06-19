import React, { useState } from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import TransactionsTable from './components/TransactionsTable';
import TransactionsStatistics from './components/TransactionsStatistics';
import TransactionsBarChart from './components/TransactionsBarChart';
import TransactionsPieChart from './components/TransactionsPieChart';

const App = () => {
  const [month, setMonth] = useState('03');

  return (
    <Container>
      <Typography variant="h4" style={{ margin: '2rem 0' }}>MERN Stack Transactions Dashboard</Typography>
      <FormControl fullWidth style={{ marginBottom: '1rem' }}>
        <InputLabel>Month</InputLabel>
        <Select value={month} onChange={(e) => setMonth(e.target.value)}>
          <MenuItem value="01">January</MenuItem>
          <MenuItem value="02">February</MenuItem>
          <MenuItem value="03">March</MenuItem>
          <MenuItem value="04">April</MenuItem>
          <MenuItem value="05">May</MenuItem>
          <MenuItem value="06">June</MenuItem>
          <MenuItem value="07">July</MenuItem>
          <MenuItem value="08">August</MenuItem>
          <MenuItem value="09">September</MenuItem>
          <MenuItem value="10">October</MenuItem>
          <MenuItem value="11">November</MenuItem>
          <MenuItem value="12">December</MenuItem>
        </Select>
      </FormControl>
      <TransactionsStatistics month={month} />
      <TransactionsTable month={month} />
      <TransactionsBarChart month={month} />
      <TransactionsPieChart month={month} />
    </Container>
  );
};

export default App;
