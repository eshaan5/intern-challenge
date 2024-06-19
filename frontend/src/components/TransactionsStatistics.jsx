import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import api from '../api';

const TransactionsStatistics = ({ month }) => {
  const [statistics, setStatistics] = useState({ totalAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 });

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    const response = await api.get('/api/products/statistics', { params: { month } });
    setStatistics(response.data);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Sale Amount</Typography>
            <Typography variant="h5">{statistics.totalAmount}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Sold Items</Typography>
            <Typography variant="h5">{statistics.totalSoldItems}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Not Sold Items</Typography>
            <Typography variant="h5">{statistics.totalNotSoldItems}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TransactionsStatistics;
