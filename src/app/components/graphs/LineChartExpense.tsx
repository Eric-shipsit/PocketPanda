import React from "react";
import { YearChartData } from "global";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartExpense = ({ data, gridOn = true}: { data: YearChartData[], gridOn?: boolean }) => {
  return (
    <ResponsiveContainer width="100%" minHeight={500}>
      <LineChart data={data}>
        
      {gridOn && ( <CartesianGrid strokeDasharray="3 3" /> )}
        <XAxis dataKey="month" />
        <YAxis dataKey="spend" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="spend" stroke="red" />
        <Line type="monotone" dataKey="income" stroke="green" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartExpense;
