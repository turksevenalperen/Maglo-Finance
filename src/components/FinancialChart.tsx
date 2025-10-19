'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WorkingCapitalData } from '@/types/chart';

interface FinancialChartProps {
  data: WorkingCapitalData[];
  currency: string;
}

export default function FinancialChart({ data, currency }: FinancialChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      value: number;
      dataKey: string;
      name: string;
      color: string;
    }>;
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
  
      const entry = payload[0]; 
      return (
        <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm font-medium">
          {formatCurrency(entry.value)}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ 
            top: 5, 
            right: 10, 
            left: 10, 
            bottom: 5 
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            stroke="rgba(146, 158, 174, 1)"
            fontSize={12}
            tick={{
              fontFamily: 'Kumbh Sans, sans-serif',
              fontSize: 12,
              fontWeight: 400,
              fill: 'rgba(146, 158, 174, 1)'
            }}
            tickFormatter={(value) => {
              const monthMap: { [key: string]: string } = {
                'January': 'Oct 10',
                'February': 'Oct 11', 
                'March': 'Oct 12',
                'April': 'Oct 13',
                'May': 'Oct 14',
                'June': 'Oct 15'
              };
              return monthMap[value] || value;
            }}
          />
          <YAxis 
            stroke="rgba(146, 158, 174, 1)"
            fontSize={12}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            width={30}
            tick={{
              fontFamily: 'Kumbh Sans, sans-serif',
              fontSize: 12,
              fontWeight: 400,
              fill: 'rgba(146, 158, 174, 1)'
            }}
            domain={[0, 10000]}
            ticks={[0, 3000, 10000]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="basis" 
            dataKey="income" 
            stroke="#29a073" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 4, fill: '#29a073' }}
            name="Income"
          />
          <Line 
            type="basis" 
            dataKey="expense" 
            stroke="#c8ee44" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 4, fill: '#c8ee44' }}
            name="Expenses"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}