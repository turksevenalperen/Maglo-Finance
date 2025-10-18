'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from 'recharts';

interface DataPoint {
  date: string;
  income: number;
  expenses: number;
}

export default function WorkingCapitalChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<'7days' | '15days' | '30days'>('7days');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const getData = (): DataPoint[] => {
    if (selectedPeriod === '7days') {
      return [
        { date: 'Apr 14', income: 5000, expenses: 4500 },
        { date: 'Apr 15', income: 7200, expenses: 5200 },
        { date: 'Apr 16', income: 6000, expenses: 6700 },
        { date: 'Apr 17', income: 5500, expenses: 7400 },
        { date: 'Apr 18', income: 4300, expenses: 4900 },
        { date: 'Apr 19', income: 4700, expenses: 4600 },
        { date: 'Apr 20', income: 5900, expenses: 5100 },
      ];
    } else if (selectedPeriod === '15days') {
      return [
        { date: 'Apr 6', income: 5400, expenses: 5000 },
        { date: 'Apr 9', income: 6700, expenses: 6300 },
        { date: 'Apr 12', income: 7100, expenses: 7600 },
        { date: 'Apr 15', income: 5900, expenses: 6200 },
        { date: 'Apr 18', income: 5500, expenses: 5700 },
        { date: 'Apr 21', income: 6900, expenses: 6000 },
        { date: 'Apr 24', income: 7300, expenses: 6700 },
      ];
    } else {
      return [
        { date: 'Mar 25', income: 11000, expenses: 9500 },
        { date: 'Apr 1', income: 12500, expenses: 13500 },
        { date: 'Apr 8', income: 10500, expenses: 9900 },
        { date: 'Apr 15', income: 11800, expenses: 12500 },
        { date: 'Apr 22', income: 12200, expenses: 11500 },
        { date: 'Apr 30', income: 12800, expenses: 12000 },
      ];
    }
  };

  const data = getData();

  return (
    <div className="bg-white rounded-lg shadow w-full min-h-[300px]">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-4 lg:p-6 gap-4">
        <div>
          <span className="text-lg font-semibold text-gray-900">Working Capital</span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Legend */}
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#29A073] mr-1.5"></span>
              <span className="text-sm text-gray-700">Income</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#C8EE44] mr-1.5"></span>
              <span className="text-sm text-gray-700">Expenses</span>
            </div>
          </div>

          {/* Period selector */}
          <div className="relative">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as '7days' | '15days' | '30days')}
              className="border border-gray-200 rounded-md text-sm px-3 py-1 bg-white cursor-pointer focus:outline-none"
            >
              <option value="7days">Last 7 days</option>
              <option value="15days">Last 15 days</option>
              <option value="30days">Last 30 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-4 lg:p-6 h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            onMouseMove={(state) => {
              if (state.activeTooltipIndex !== undefined && typeof state.activeTooltipIndex === 'number') {
                setActiveIndex(state.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {/* Grid */}
            <CartesianGrid stroke="#F5F5F5" vertical={false} />

            {/* Axes */}
            <XAxis
              dataKey="date"
              tick={{ fill: '#666', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: '#666', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={40}
            />

            {/* Highlight area */}
            {activeIndex !== null && (
              <ReferenceArea
                x1={data[Math.max(activeIndex - 0.5, 0)]?.date}
                x2={data[Math.min(activeIndex + 0.5, data.length - 1)]?.date}
                fill="#29A073"
                fillOpacity={0.05}
              />
            )}

            {/* Lines */}
            <Line
              type="monotone"
              dataKey="income"
              stroke="#29A073"
              strokeWidth={3}
              dot={{ r: 4, fill: '#29A073', stroke: '#fff', strokeWidth: 2 }}
              activeDot={{
                r: 6,
                fill: '#29A073',
                stroke: '#fff',
                strokeWidth: 2,
                filter: 'drop-shadow(0 0 6px rgba(41,160,115,0.4))',
              }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#C8EE44"
              strokeWidth={3}
              dot={{ r: 4, fill: '#C8EE44', stroke: '#fff', strokeWidth: 2 }}
              activeDot={{
                r: 6,
                fill: '#C8EE44',
                stroke: '#fff',
                strokeWidth: 2,
                filter: 'drop-shadow(0 0 6px rgba(200,238,68,0.4))',
              }}
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{ stroke: '#29A073', strokeWidth: 1, strokeDasharray: '5 5' }}
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;
                const data = payload[0].payload;
                return (
                  <div className="bg-white/90 backdrop-blur-md border border-gray-200/60 shadow-xl rounded-lg px-4 py-3 text-gray-800">
                    <div className="text-xs text-gray-500 mb-2">{label}</div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#29A073]"></div>
                          <span className="text-sm text-gray-700">Income</span>
                        </div>
                        <span className="font-semibold text-[#29A073]">
                          ${(data.income / 1000).toFixed(1)}K
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#C8EE44]"></div>
                          <span className="text-sm text-gray-700">Expenses</span>
                        </div>
                        <span className="font-semibold text-[#C8EE44]">
                          ${(data.expenses / 1000).toFixed(1)}K
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
