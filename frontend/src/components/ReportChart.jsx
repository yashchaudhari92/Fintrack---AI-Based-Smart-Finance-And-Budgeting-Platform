import React, { useMemo } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { FiPieChart } from 'react-icons/fi';

const COLORS = [
    '#3B82F6',
    '#10B981',
    '#F59E0B',
    '#F97316',
    '#8B5CF6',
    '#EC4899',
    '#06B6D4',
    '#64748B',
];

const formatCurrency = (value) => {
    const numericValue = Number(value) || 0;

    return `₹${numericValue.toLocaleString('en-IN', {
        maximumFractionDigits: 0,
    })}`;
};

const ReportChart = ({ data }) => {
    const formattedData = useMemo(() => {
        if (!data || typeof data !== 'object') {
            return [];
        }

        return Object.entries(data)
            .map(([category, total]) => ({
                name: category,
                value: Number(total) || 0,
            }))
            .filter((item) => item.value > 0);
    }, [data]);

    const total = useMemo(
        () => formattedData.reduce((sum, item) => sum + item.value, 0),
        [formattedData]
    );

    if (!formattedData.length) {
        return (
            <div className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-400">
                    <FiPieChart size={22} />
                </div>

                <h3 className="text-sm font-bold text-slate-800">
                    No report data available
                </h3>

                <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
                    There is not enough category data to display the report chart.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Header */}
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
                            <FiPieChart size={18} />
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                                Expense Breakdown
                            </h3>
                            <p className="text-xs text-slate-500">
                                Spending by category
                            </p>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            Total
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                            {formatCurrency(total)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="px-3 py-5 sm:px-6">
                <div className="h-[320px] w-full sm:h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={formattedData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="45%"
                                innerRadius="52%"
                                outerRadius="72%"
                                paddingAngle={3}
                                stroke="none"
                                animationBegin={100}
                                animationDuration={700}
                            >
                                {formattedData.map((entry, index) => (
                                    <Cell
                                        key={`${entry.name}-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                cursor={false}
                                formatter={(value) => [
                                    formatCurrency(value),
                                    'Amount',
                                ]}
                                contentStyle={{
                                    borderRadius: '12px',
                                    border: '1px solid #E2E8F0',
                                    background: '#FFFFFF',
                                    boxShadow:
                                        '0 10px 30px rgba(15, 23, 42, 0.10)',
                                    padding: '10px 12px',
                                }}
                                labelStyle={{
                                    color: '#0F172A',
                                    fontWeight: 700,
                                    marginBottom: '4px',
                                }}
                            />

                            <Legend
                                verticalAlign="bottom"
                                align="center"
                                iconType="circle"
                                iconSize={8}
                                wrapperStyle={{
                                    paddingTop: '12px',
                                    fontSize: '12px',
                                    color: '#64748B',
                                }}
                                formatter={(value) => (
                                    <span className="font-medium text-slate-600">
                                        {value}
                                    </span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Category summary */}
            <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:px-6">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {formattedData.map((item, index) => {
                        const percentage =
                            total > 0 ? (item.value / total) * 100 : 0;

                        return (
                            <div
                                key={`${item.name}-summary`}
                                className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-3 py-2.5"
                            >
                                <div className="flex min-w-0 items-center gap-2.5">
                                    <span
                                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                                        style={{
                                            backgroundColor:
                                                COLORS[index % COLORS.length],
                                        }}
                                    />

                                    <span className="truncate text-xs font-semibold text-slate-600">
                                        {item.name}
                                    </span>
                                </div>

                                <div className="ml-3 flex shrink-0 items-center gap-2">
                                    <span className="text-xs font-bold text-slate-800">
                                        {formatCurrency(item.value)}
                                    </span>

                                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                                        {percentage.toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ReportChart;




// // frontend/src/components/ReportChart.jsx
// import React from 'react';
// import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const ReportChart = ({ data }) => {
//   const formattedData = Object.entries(data).map(([category, total]) => ({
//     name: category,
//     value: total,
//   }));

//   return (
//     <PieChart width={400} height={300}>
//       <Pie data={formattedData} dataKey="value" nameKey="name" outerRadius={100}>
//         {formattedData.map((_, index) => (
//           <Cell key={index} fill={COLORS[index % COLORS.length]} />
//         ))}
//       </Pie>
//       <Tooltip />
//       <Legend />
//     </PieChart>
//   );
// };

// export default ReportChart;
