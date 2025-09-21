import DashboardLayout from "../components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { motion } from "framer-motion";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

// --- MOCK DATA (UNCHANGED) ---
const summary = [
  { label: "Customers", value: 3781, delta: "+11.01%", color: "text-blue-600" },
  { label: "Orders", value: 1219, delta: "-0.03%", color: "text-emerald-600" },
  {
    label: "Revenue",
    value: 695,
    delta: "+15.03%",
    color: "text-indigo-600",
    prefix: "$",
  },
  {
    label: "Growth",
    value: 30.1,
    delta: "+6.08%",
    color: "text-purple-600",
    suffix: "%",
  },
];

const bars = [
  { name: "Jan", value: 24 },
  { name: "Feb", value: 18 },
  { name: "Mar", value: 26 },
  { name: "Apr", value: 22 },
  { name: "May", value: 28 },
  { name: "Jun", value: 25 },
];

const lineData = [
  { name: "Jan", current: 8, prev: 7 },
  { name: "Feb", current: 12, prev: 16 },
  { name: "Mar", current: 10, prev: 12 },
  { name: "Apr", current: 16, prev: 14 },
  { name: "May", current: 14, prev: 10 },
  { name: "Jun", current: 20, prev: 9 },
];

const pie = [
  { name: "Direct", value: 300.56, color: "#22c55e" },
  { name: "Affiliate", value: 135.18, color: "#06b6d4" },
  { name: "Sponsored", value: 154.02, color: "#a855f7" },
  { name: "E-mail", value: 84.96, color: "#f59e0b" },
];

const topProducts = [
  {
    name: "ASOS Ridley High Waist",
    price: "$79.49",
    qty: 82,
    amount: "$4,518.8",
  },
  {
    name: "Marco Lightweight Shirt",
    price: "$128.50",
    qty: 37,
    amount: "$4,754.5",
  },
  { name: "Half Sleeve Shirt", price: "$39.99", qty: 64, amount: "$2,559.36" },
  {
    name: "Lightweight Jacket",
    price: "$20.00",
    qty: 184,
    amount: "$3,680.00",
  },
  { name: "Marco Shoes", price: "$79.49", qty: 64, amount: "$1,695.81" },
];

// A simple icon component to match the screenshot
const TrendingIcon = ({ isUp, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className={`w-4 h-4 ${className}`}
    style={{ transform: isUp ? "none" : "rotate(90deg)" }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
    />
  </svg>
);

// --- RESPONSIVE COMPONENT ---
export default function Index() {
  const totalSales = pie.reduce((acc, cur) => acc + cur.value, 0);
  const directPct = Math.round((pie[0].value / totalSales) * 1000) / 10;

  return (
    <DashboardLayout>
      <main className="p-4 md:p-6 grid grid-cols-12 gap-4 md:gap-6 min-w-0">
        <h2 className="col-span-12 text-2xl font-semibold">eCommerce</h2>

        {/* ======================= TOP ROW ======================= */}

        {/* Summary Cards Container */}
        <div className="col-span-12 lg:col-span-5">
          {/* This sub-grid creates the 2x2 layout for the summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {summary.map((s, index) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="rounded-2xl">
                  <CardContent className="p-5">
                    <div className="text-xs text-muted-foreground mb-2">
                      {s.label}
                    </div>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-semibold tabular-nums">
                        {s.prefix}
                        {s.value}
                        {s.suffix}
                      </p>
                      <div
                        className={`flex items-center gap-1 text-xs ${s.color}`}
                      >
                        <span>{s.delta}</span>
                        <TrendingIcon isUp={!s.delta.startsWith("-")} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Projections vs Actuals Chart */}
        <div className="col-span-12 lg:col-span-7">
          <Card className="h-full rounded-2xl">
            <CardHeader className="p-5 pb-2">
              <CardTitle className="text-base">
                Projections vs Actuals
              </CardTitle>
            </CardHeader>
            <CardContent className="px-1 pb-2 sm:px-2">
              <ChartContainer
                config={{ value: { label: "Value" } }}
                className="!aspect-[16/6]"
              >
                <BarChart
                  data={bars}
                  // Add a margin to create space for the Y-axis labels
                  margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#888888", fontSize: 12 }}
                  />

                  {/* --- MODIFIED Y-AXIS --- */}
                  <YAxis
                    // Define the specific points on the axis
                    ticks={[0, 10, 20, 30]}
                    // Set the chart's value range from 0 to 30
                    domain={[0, 30]}
                    // Hide the axis and tick lines for a cleaner look
                    axisLine={false}
                    tickLine={false}
                    // Style the labels
                    tick={{ fill: "#888888", fontSize: 12 }}
                    // Add "M" suffix to each label
                    tickFormatter={(value) => `${value}M`}
                  />
                  {/* ------------------------- */}

                  <Bar
                    dataKey="value"
                    radius={[8, 8, 0, 0]}
                    fill="#dbeafe"
                    stroke="#60a5fa"
                    strokeWidth={2}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* ======================= MIDDLE ROW ======================= */}

        {/* Revenue Chart */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="rounded-2xl">
            <CardHeader className="p-5 pb-2">
              <CardTitle className="text-base">Revenue</CardTitle>
              <div className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  Current Week
                </span>{" "}
                $58,211
                <span className="mx-2">•</span>
                <span className="font-medium text-foreground">
                  Previous Week
                </span>{" "}
                $68,768
              </div>
            </CardHeader>
            <CardContent className="px-1 sm:px-2 pb-2">
              <ChartContainer
                config={{
                  current: { label: "Current" },
                  prev: { label: "Previous" },
                }}
                className="!aspect-[16/6]"
              >
                <LineChart
                  data={lineData}
                  // The left margin provides space for the new Y-axis labels
                  margin={{ left: 10, right: 10, top: 10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#888888", fontSize: 12 }}
                  />

                  {/* --- ADDED Y-AXIS CONFIGURATION --- */}
                  <YAxis
                    ticks={[0, 10, 20, 30]}
                    domain={[0, 30]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#888888", fontSize: 12 }}
                    tickFormatter={(value) => `${value}M`}
                  />
                  {/* ------------------------------------ */}

                  <Line
                    type="monotone"
                    dataKey="prev"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    strokeDasharray="6 6"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="current"
                    stroke="#1e293b"
                    strokeWidth={2.5}
                    dot={false}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Revenue by Location */}
        <div className="col-span-12 lg:col-span-4">
          <Card className="rounded-2xl h-full">
            <CardHeader className="p-5 pb-2">
              <CardTitle className="text-base">Revenue by Location</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 text-sm text-muted-foreground space-y-4">
              {/* Placeholder for map - can be added here */}
              {[
                { label: "New York", val: 72 },
                { label: "San Francisco", val: 39 },
                { label: "Sydney", val: 25 },
                { label: "Singapore", val: 61 },
              ].map((r) => (
                <div key={r.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{r.label}</span>
                    <span className="font-medium text-foreground">
                      {r.val}K
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-blue-400"
                      style={{ width: `${r.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ======================= BOTTOM ROW ======================= */}

        {/* Top Selling Products Table */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="rounded-2xl">
            <CardHeader className="p-5 pb-2">
              <CardTitle className="text-base">Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[640px]">
                  <thead>
                    <tr className="border-b text-muted-foreground">
                      <th className="p-4 text-left font-medium">Name</th>
                      <th className="p-4 text-left font-medium">Price</th>
                      <th className="p-4 text-left font-medium">Quantity</th>
                      <th className="p-4 text-left font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((p, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td
                          className="p-4 max-w-[280px] truncate"
                          title={p.name}
                        >
                          {p.name}
                        </td>
                        <td className="p-4 text-muted-foreground">{p.price}</td>
                        <td className="p-4 text-muted-foreground">{p.qty}</td>
                        <td className="p-4 font-medium">{p.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Total Sales Pie Chart */}
        <div className="col-span-12 lg:col-span-4">
          <Card className="rounded-2xl h-full">
            <CardHeader className="p-5 pb-2">
              <CardTitle className="text-base">Total Sales</CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="flex flex-col">
                <div className="relative w-36 h-36 shrink-0">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={pie}
                        dataKey="value"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                      >
                        {pie.map((entry, index) => (
                          <Cell key={`c-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-sm font-semibold">{directPct}%</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  {pie.map((s) => (
                    <div key={s.name} className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-sm"
                        style={{ background: s.color }}
                      />
                      <span className="text-muted-foreground w-20">
                        {s.name}
                      </span>
                      <span className="font-medium">
                        ${s.value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </DashboardLayout>
  );
}
