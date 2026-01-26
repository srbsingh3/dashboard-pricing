"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  dailyOrdersData,
  cityPerformanceData,
  verticalBreakdownData,
  deliveryFeeDistribution,
} from "@/lib/mock-data";

// Custom tooltip style
const tooltipStyle = {
  backgroundColor: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "12px",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
};

// Orders Trend Chart
export function OrdersTrendChart() {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      <div className="mb-4">
        <h3 className="text-body-bold text-neutral-900">Orders Trend</h3>
        <p className="text-caption text-neutral-500">Daily orders over the last 30 days</p>
      </div>
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dailyOrdersData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value: number) => [value.toLocaleString(), "Orders"]}
              labelStyle={{ fontWeight: 600, marginBottom: 4 }}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#ordersGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Delivery Fee Trend Chart
export function DeliveryFeeTrendChart() {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      <div className="mb-4">
        <h3 className="text-body-bold text-neutral-900">Avg. Delivery Fee Trend</h3>
        <p className="text-caption text-neutral-500">Average delivery fee over time</p>
      </div>
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dailyOrdersData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="feeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
              domain={[2.0, 2.4]}
              tickFormatter={(value) => `€${value.toFixed(2)}`}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value: number) => [`€${value.toFixed(2)}`, "Avg. Fee"]}
              labelStyle={{ fontWeight: 600, marginBottom: 4 }}
            />
            <Area
              type="monotone"
              dataKey="deliveryFee"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#feeGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// City Performance Bar Chart
export function CityPerformanceChart() {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      <div className="mb-4">
        <h3 className="text-body-bold text-neutral-900">Orders by City</h3>
        <p className="text-caption text-neutral-500">Total orders per city this month</p>
      </div>
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={cityPerformanceData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={true} vertical={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <YAxis
              type="category"
              dataKey="city"
              tick={{ fontSize: 12, fill: "#374151" }}
              tickLine={false}
              axisLine={false}
              width={70}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value: number) => [value.toLocaleString(), "Orders"]}
              labelStyle={{ fontWeight: 600, marginBottom: 4 }}
            />
            <Bar dataKey="orders" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Delivery Fee by City Chart
export function DeliveryFeeByCityChart() {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      <div className="mb-4">
        <h3 className="text-body-bold text-neutral-900">Avg. Delivery Fee by City</h3>
        <p className="text-caption text-neutral-500">Compare pricing across cities</p>
      </div>
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={cityPerformanceData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="city"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
              domain={[0, 3]}
              tickFormatter={(value) => `€${value.toFixed(1)}`}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value: number) => [`€${value.toFixed(2)}`, "Avg. Fee"]}
              labelStyle={{ fontWeight: 600, marginBottom: 4 }}
            />
            <Bar dataKey="avgDeliveryFee" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Vertical Breakdown Pie Chart
export function VerticalBreakdownChart() {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      <div className="mb-4">
        <h3 className="text-body-bold text-neutral-900">Orders by Vertical</h3>
        <p className="text-caption text-neutral-500">Distribution across business verticals</p>
      </div>
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={verticalBreakdownData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
              dataKey="value"
            >
              {verticalBreakdownData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value: number, name: string) => [`${value}%`, name]}
            />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-caption text-neutral-600">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Delivery Fee Distribution Chart
export function DeliveryFeeDistributionChart() {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      <div className="mb-4">
        <h3 className="text-body-bold text-neutral-900">Delivery Fee Distribution</h3>
        <p className="text-caption text-neutral-500">Orders by fee range</p>
      </div>
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={deliveryFeeDistribution}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="range"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value: number, name: string) => {
                if (name === "count") return [value.toLocaleString(), "Orders"];
                return [value, name];
              }}
              labelStyle={{ fontWeight: 600, marginBottom: 4 }}
            />
            <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={45} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Conversion Rate by City Chart
export function ConversionByCityChart() {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      <div className="mb-4">
        <h3 className="text-body-bold text-neutral-900">Conversion Rate by City</h3>
        <p className="text-caption text-neutral-500">CVR comparison across cities</p>
      </div>
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={cityPerformanceData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="city"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
              domain={[50, 70]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value: number) => [`${value.toFixed(1)}%`, "CVR"]}
              labelStyle={{ fontWeight: 600, marginBottom: 4 }}
            />
            <Bar dataKey="cvr" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
