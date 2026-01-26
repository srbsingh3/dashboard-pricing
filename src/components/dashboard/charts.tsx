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

// Refined animation configuration - different styles for different chart types
const CHART_ANIMATION = {
  // Area charts: flowing entrance, data "sweeps" in smoothly
  area: {
    duration: 500,
    easing: "ease-out" as const,
  },
  // Vertical bars: snappy growth with satisfying settle
  barVertical: {
    duration: 350,
    easing: "ease-in-out" as const,
  },
  // Horizontal bars: quick extension from left
  barHorizontal: {
    duration: 350,
    easing: "ease-out" as const,
  },
  // Pie/donut: natural expansion
  pie: {
    duration: 400,
    easing: "ease-out" as const,
  },
};

// Subframe-aligned chart styling constants
const CHART_STYLES = {
  // Axis styling (matches Subframe typography)
  axisTick: {
    fontSize: 12,
    fill: "#71717A", // neutral-500/subtext-color
  },
  axisLine: {
    stroke: "#E5E5E5", // neutral-200
  },
  grid: {
    stroke: "#F5F5F5", // neutral-100
  },
  // Tooltip styling
  tooltip: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E5E5",
    borderRadius: "4px",
    padding: "8px 12px",
    boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
  },
  tooltipLabel: {
    fontSize: "12px",
    fontWeight: 500,
    color: "#171717", // neutral-900/default-font
    marginBottom: "4px",
  },
  tooltipItem: {
    fontSize: "12px",
    color: "#737373", // neutral-500
  },
  // Cursor for hover
  cursor: {
    stroke: "#D4D4D4", // neutral-300
    strokeWidth: 1,
  },
  barCursor: {
    fill: "#FAFAFA", // neutral-50
  },
};

// Custom tooltip component for Pie Chart (Subframe-style)
interface PieTooltipPayload {
  name: string;
  value: number;
  payload: {
    name: string;
    value: number;
    color: string;
  };
}

interface PieTooltipProps {
  active?: boolean;
  payload?: PieTooltipPayload[];
}

function PieChartTooltip({ active, payload }: PieTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div
        className="flex animate-in flex-col gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 shadow-sm duration-100 fade-in"
        style={{ minWidth: "100px" }}
      >
        <div className="flex items-center gap-2">
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: data.payload.color }}
          />
          <span className="text-caption text-neutral-500">{data.name}</span>
          <span className="ml-auto text-caption text-neutral-900">
            {data.value}%
          </span>
        </div>
      </div>
    );
  }
  return null;
}

// Orders Trend Chart
export function OrdersTrendChart() {
  return (
    <div className="flex flex-col gap-6 rounded-md border border-neutral-border bg-default-background p-6 shadow-sm">
      <h3 className="text-heading-3 text-default-font">Orders Trend</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dailyOrdersData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_STYLES.grid.stroke} vertical={false} />
            <XAxis
              dataKey="date"
              tick={CHART_STYLES.axisTick}
              tickLine={false}
              axisLine={CHART_STYLES.axisLine}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={CHART_STYLES.axisTick}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
            />
            <Tooltip
              contentStyle={CHART_STYLES.tooltip}
              labelStyle={CHART_STYLES.tooltipLabel}
              itemStyle={CHART_STYLES.tooltipItem}
              cursor={CHART_STYLES.cursor}
              formatter={(value) => [Number(value).toLocaleString(), "Orders"]}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#ordersGradient)"
              animationDuration={CHART_ANIMATION.area.duration}
              animationEasing={CHART_ANIMATION.area.easing}
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
    <div className="flex flex-col gap-6 rounded-md border border-neutral-border bg-default-background p-6 shadow-sm">
      <h3 className="text-heading-3 text-default-font">Avg. Delivery Fee Trend</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dailyOrdersData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="feeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_STYLES.grid.stroke} vertical={false} />
            <XAxis
              dataKey="date"
              tick={CHART_STYLES.axisTick}
              tickLine={false}
              axisLine={CHART_STYLES.axisLine}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={CHART_STYLES.axisTick}
              tickLine={false}
              axisLine={false}
              domain={[2.0, 2.4]}
              tickFormatter={(value) => `€${value.toFixed(2)}`}
            />
            <Tooltip
              contentStyle={CHART_STYLES.tooltip}
              labelStyle={CHART_STYLES.tooltipLabel}
              itemStyle={CHART_STYLES.tooltipItem}
              cursor={CHART_STYLES.cursor}
              formatter={(value) => [`€${Number(value).toFixed(2)}`, "Avg. Fee"]}
            />
            <Area
              type="monotone"
              dataKey="deliveryFee"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#feeGradient)"
              animationDuration={CHART_ANIMATION.area.duration}
              animationEasing={CHART_ANIMATION.area.easing}
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
    <div className="flex flex-col gap-6 rounded-md border border-neutral-border bg-default-background p-6 shadow-sm">
      <h3 className="text-heading-3 text-default-font">Orders by City</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={cityPerformanceData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_STYLES.grid.stroke} horizontal={true} vertical={false} />
            <XAxis
              type="number"
              tick={CHART_STYLES.axisTick}
              tickLine={false}
              axisLine={CHART_STYLES.axisLine}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <YAxis
              type="category"
              dataKey="city"
              tick={{ fontSize: 12, fill: "#404040" }}
              tickLine={false}
              axisLine={false}
              width={70}
            />
            <Tooltip
              contentStyle={CHART_STYLES.tooltip}
              labelStyle={CHART_STYLES.tooltipLabel}
              itemStyle={CHART_STYLES.tooltipItem}
              cursor={CHART_STYLES.barCursor}
              formatter={(value) => [Number(value).toLocaleString(), "Orders"]}
            />
            <Bar
              dataKey="orders"
              fill="#6366f1"
              radius={[0, 2, 2, 0]}
              barSize={16}
              animationDuration={CHART_ANIMATION.barHorizontal.duration}
              animationEasing={CHART_ANIMATION.barHorizontal.easing}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Delivery Fee by City Chart
export function DeliveryFeeByCityChart() {
  return (
    <div className="flex flex-col gap-6 rounded-md border border-neutral-border bg-default-background p-6 shadow-sm">
      <h3 className="text-heading-3 text-default-font">Avg. Delivery Fee by City</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={cityPerformanceData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_STYLES.grid.stroke} vertical={false} />
            <XAxis
              dataKey="city"
              tick={CHART_STYLES.axisTick}
              tickLine={false}
              axisLine={CHART_STYLES.axisLine}
            />
            <YAxis
              tick={CHART_STYLES.axisTick}
              tickLine={false}
              axisLine={false}
              domain={[0, 3]}
              tickFormatter={(value) => `€${value.toFixed(1)}`}
            />
            <Tooltip
              contentStyle={CHART_STYLES.tooltip}
              labelStyle={CHART_STYLES.tooltipLabel}
              itemStyle={CHART_STYLES.tooltipItem}
              cursor={CHART_STYLES.barCursor}
              formatter={(value) => [`€${Number(value).toFixed(2)}`, "Avg. Fee"]}
            />
            <Bar
              dataKey="avgDeliveryFee"
              fill="#22c55e"
              radius={[2, 2, 0, 0]}
              barSize={28}
              animationDuration={CHART_ANIMATION.barVertical.duration}
              animationEasing={CHART_ANIMATION.barVertical.easing}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Vertical Breakdown Pie Chart (Subframe-style donut)
export function VerticalBreakdownChart() {
  return (
    <div className="flex flex-col gap-6 rounded-md border border-neutral-border bg-default-background p-6 shadow-sm">
      <h3 className="text-heading-3 text-default-font">Order Share by Vertical</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={verticalBreakdownData}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius="82%"
              outerRadius="100%"
              paddingAngle={0.5}
              dataKey="value"
              nameKey="name"
              animationDuration={CHART_ANIMATION.pie.duration}
              animationEasing={CHART_ANIMATION.pie.easing}
            >
              {verticalBreakdownData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<PieChartTooltip />} isAnimationActive={false} />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="top"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingLeft: "16px" }}
              formatter={(value) => (
                <span className="text-caption text-neutral-500">{value}</span>
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
    <div className="flex flex-col gap-6 rounded-md border border-neutral-border bg-default-background p-6 shadow-sm">
      <h3 className="text-heading-3 text-default-font">Delivery Fee Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={deliveryFeeDistribution}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_STYLES.grid.stroke} vertical={false} />
            <XAxis
              dataKey="range"
              tick={CHART_STYLES.axisTick}
              tickLine={false}
              axisLine={CHART_STYLES.axisLine}
            />
            <YAxis
              tick={CHART_STYLES.axisTick}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={CHART_STYLES.tooltip}
              labelStyle={CHART_STYLES.tooltipLabel}
              itemStyle={CHART_STYLES.tooltipItem}
              cursor={CHART_STYLES.barCursor}
              formatter={(value, name) => {
                if (name === "count") return [Number(value).toLocaleString(), "Orders"];
                return [value, String(name)];
              }}
            />
            <Bar
              dataKey="count"
              fill="#f59e0b"
              radius={[4, 4, 0, 0]}
              barSize={45}
              animationDuration={CHART_ANIMATION.barVertical.duration}
              animationEasing={CHART_ANIMATION.barVertical.easing}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Conversion Rate by City Chart
export function ConversionByCityChart() {
  return (
    <div className="flex flex-col gap-6 rounded-md border border-neutral-border bg-default-background p-6 shadow-sm">
      <h3 className="text-heading-3 text-default-font">Conversion Rate by City</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={cityPerformanceData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_STYLES.grid.stroke} vertical={false} />
            <XAxis
              dataKey="city"
              tick={CHART_STYLES.axisTick}
              tickLine={false}
              axisLine={CHART_STYLES.axisLine}
            />
            <YAxis
              tick={CHART_STYLES.axisTick}
              tickLine={false}
              axisLine={false}
              domain={[50, 70]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={CHART_STYLES.tooltip}
              labelStyle={CHART_STYLES.tooltipLabel}
              itemStyle={CHART_STYLES.tooltipItem}
              cursor={CHART_STYLES.barCursor}
              formatter={(value) => [`${Number(value).toFixed(1)}%`, "CVR"]}
            />
            <Bar
              dataKey="cvr"
              fill="#ec4899"
              radius={[4, 4, 0, 0]}
              barSize={40}
              animationDuration={CHART_ANIMATION.barVertical.duration}
              animationEasing={CHART_ANIMATION.barVertical.easing}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
