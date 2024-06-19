import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Paper, Typography } from '@mui/material';
import api from '../api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const TransactionsPieChart = ({ month }) => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    fetchPieData();
  }, [month]);

  const fetchPieData = async () => {
    const response = await api.get('/api/products/pie-chart', { params: { month } });
    console.log(response.data, 'pie data');
    setPieData(response.data.map((d, index) => ({ ...d, color: COLORS[index % COLORS.length] })));
  };

  const renderCustomLegend = (props) => {
    const { payload } = props;
    console.log(payload, 'payload');
    return (
      <ul>
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {entry.payload.payload.payload._id}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Paper style={{ padding: '1rem', marginTop: '3rem', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6">Category Distribution</Typography>
      <PieChart width={400} height={400}>
        <Pie
          data={pieData}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="count"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend content={renderCustomLegend} />
      </PieChart>
    </Paper>
  );
};

export default TransactionsPieChart;
