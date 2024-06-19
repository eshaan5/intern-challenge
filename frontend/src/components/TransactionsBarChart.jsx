import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Paper, Typography } from '@mui/material';
import api from '../api';

const TransactionsBarChart = ({ month }) => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    fetchBarData();
  }, [month]);

  const fetchBarData = async () => {
    const response = await api.get('/api/products/bar-chart', { params: { month } });
    setBarData(response.data);
  };

  return (
    <Paper style={{ padding: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6">Price Range Distribution</Typography>
      <BarChart width={600} height={300} data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </Paper>
  );
};

export default TransactionsBarChart;
