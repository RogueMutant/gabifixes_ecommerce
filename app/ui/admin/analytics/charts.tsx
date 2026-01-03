"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface SalesData {
  name: string;
  sales: number;
  orders: number;
}

export function RevenueChart({ data }: { data: SalesData[] }) {
  return (
    <div className="h-[350px] w-full rounded-lg bg-white dark:bg-gray-800 p-4 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
        Revenue Over Time
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            stroke="#9ca3af"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#9ca3af"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            }}
            itemStyle={{ color: "#16a34a" }}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#16a34a"
            strokeWidth={3}
            dot={{ r: 4, fill: "#16a34a" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function OrdersChart({ data }: { data: SalesData[] }) {
  return (
    <div className="h-[350px] w-full rounded-lg bg-white dark:bg-gray-800 p-4 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
        Orders Over Time
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            stroke="#9ca3af"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#9ca3af"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            }}
            cursor={{ fill: "transparent" }}
          />
          <Bar
            dataKey="orders"
            fill="#16a34a"
            radius={[4, 4, 0, 0]}
            maxBarSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
