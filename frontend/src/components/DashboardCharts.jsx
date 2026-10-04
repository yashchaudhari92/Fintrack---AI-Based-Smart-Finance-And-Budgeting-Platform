import React, { useMemo, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { motion } from 'framer-motion';
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiBarChart2,
  FiCalendar,
  FiPieChart,
  FiTrendingDown,
  FiTrendingUp,
  FiActivity,
  FiMinus,
} from 'react-icons/fi';

const CHART_COLORS = ['#10b981', '#f43f5e'];

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
};

const DashboardCharts = ({ transactions = [] }) => {
  const [viewMode, setViewMode] = useState('monthly');

  const {
    income,
    expense,
    totalIncome,
    totalExpense,
    budgetLeft,
  } = useMemo(() => {
    const incomeTransactions = transactions.filter(
      (transaction) => transaction.type === 'income'
    );

    const expenseTransactions = transactions.filter(
      (transaction) => transaction.type === 'expense'
    );

    const incomeTotal = incomeTransactions.reduce(
      (accumulator, current) =>
        accumulator + (Number(current.amount) || 0),
      0
    );

    const expenseTotal = expenseTransactions.reduce(
      (accumulator, current) =>
        accumulator + (Number(current.amount) || 0),
      0
    );

    return {
      income: incomeTransactions,
      expense: expenseTransactions,
      totalIncome: incomeTotal,
      totalExpense: expenseTotal,
      budgetLeft: incomeTotal - expenseTotal,
    };
  }, [transactions]);

  const pieData = useMemo(
    () => [
      {
        name: 'Income',
        value: totalIncome,
      },
      {
        name: 'Expense',
        value: totalExpense,
      },
    ],
    [totalIncome, totalExpense]
  );

  const groupByPeriod = (txns, mode) => {
    const grouped = {};

    txns.forEach((txn) => {
      const date = new Date(txn.date);

      if (Number.isNaN(date.getTime())) {
        return;
      }

      let key = '';

      if (mode === 'weekly') {
        const week = Math.ceil(date.getDate() / 7);

        key = `W${week}-${date.toLocaleString('default', {
          month: 'short',
        })}`;
      } else if (mode === 'monthly') {
        key = date.toLocaleString('default', {
          month: 'short',
          year: 'numeric',
        });
      } else if (mode === 'yearly') {
        key = date.getFullYear().toString();
      } else {
        key = date.toISOString().split('T')[0];
      }

      grouped[key] =
        (grouped[key] || 0) + (Number(txn.amount) || 0);
    });

    return Object.entries(grouped).map(([period, value]) => ({
      period,
      value,
    }));
  };

  const expenseData = useMemo(
    () => groupByPeriod(expense, viewMode),
    [expense, viewMode]
  );

  const averageExpense =
    expense.length > 0 ? totalExpense / expense.length : 0;

  const savingsRate =
    totalIncome > 0
      ? ((budgetLeft / totalIncome) * 100).toFixed(1)
      : '0.0';

  const isPositive = budgetLeft >= 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mb-8"
    >
      {/* Section Header */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-600 ring-1 ring-slate-200">
              <FiBarChart2 size={16} />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Financial Analytics
            </span>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Financial Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Understand your income, spending and financial trends.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
          <FiActivity size={14} className="text-slate-400" />

          <span className="text-xs font-semibold text-slate-500">
            {transactions.length} transaction
            {transactions.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Income */}
        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Total Income
              </p>

              <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
                ₹{formatCurrency(totalIncome)}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <FiTrendingUp size={18} />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-600">
            <FiArrowUpRight size={14} />
            <span>{income.length} income transaction(s)</span>
          </div>
        </motion.div>

        {/* Expense */}
        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Total Expense
              </p>

              <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
                ₹{formatCurrency(totalExpense)}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <FiTrendingDown size={18} />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-rose-600">
            <FiArrowDownRight size={14} />
            <span>{expense.length} expense transaction(s)</span>
          </div>
        </motion.div>

        {/* Difference */}
        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Income vs Expense
              </p>

              <p
                className={`mt-2 text-2xl font-extrabold tracking-tight ${
                  isPositive
                    ? 'text-emerald-600'
                    : 'text-rose-600'
                }`}
              >
                {budgetLeft < 0 ? '-' : ''}₹
                {formatCurrency(Math.abs(budgetLeft))}
              </p>
            </div>

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                isPositive
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-rose-50 text-rose-600'
              }`}
            >
              {isPositive ? (
                <FiTrendingUp size={18} />
              ) : (
                <FiTrendingDown size={18} />
              )}
            </div>
          </div>

          <div
            className={`mt-4 flex items-center gap-2 text-xs font-semibold ${
              isPositive
                ? 'text-emerald-600'
                : 'text-rose-600'
            }`}
          >
            {isPositive ? (
              <>
                <FiArrowUpRight size={14} />
                Positive balance
              </>
            ) : (
              <>
                <FiArrowDownRight size={14} />
                Spending exceeds income
              </>
            )}
          </div>
        </motion.div>

        {/* Savings */}
        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Savings Rate
              </p>

              <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
                {savingsRate}%
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 ring-1 ring-slate-200">
              <FiPieChart size={18} />
            </div>
          </div>

          <div className="mt-4 text-xs font-semibold text-slate-500">
            Avg. expense ₹{formatCurrency(averageExpense)}
          </div>
        </motion.div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Income vs Expense */}
        <motion.div
          whileHover={{ y: -2 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Income vs Expense
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Overall distribution of your money.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-semibold text-slate-500">
                  Income
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                <span className="text-[11px] font-semibold text-slate-500">
                  Expense
                </span>
              </div>
            </div>
          </div>

          <div className="relative h-[280px] w-full">
            {totalIncome === 0 && totalExpense === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                  <FiPieChart size={20} />
                </div>

                <p className="text-sm font-semibold text-slate-600">
                  No financial data yet
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Add transactions to see the breakdown.
                </p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={62}
                    outerRadius={92}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CHART_COLORS[index]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      `₹${formatCurrency(value)}`
                    }
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      boxShadow:
                        '0 10px 25px rgba(15, 23, 42, 0.08)',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}

            {totalIncome > 0 || totalExpense > 0 ? (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Total
                  </p>

                  <p className="mt-1 text-base font-extrabold text-slate-800">
                    ₹
                    {formatCurrency(
                      totalIncome + totalExpense
                    )}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </motion.div>

        {/* Expense Trends */}
        <motion.div
          whileHover={{ y: -2 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6"
        >
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Expense Trends
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Track how your spending changes over time.
              </p>
            </div>

            <div className="relative">
              <FiCalendar
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={viewMode}
                onChange={(e) =>
                  setViewMode(e.target.value)
                }
                className="h-10 appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-8 text-xs font-semibold text-slate-600 outline-none transition-all duration-200 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="custom">
                  Custom (Date wise)
                </option>
              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </div>
          </div>

          <div className="h-[280px] w-full">
            {expenseData.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                  <FiTrendingDown size={20} />
                </div>

                <p className="text-sm font-semibold text-slate-600">
                  No expense data
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Add expense transactions to see trends.
                </p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                {viewMode === 'yearly' ? (
                  <LineChart
                    data={expenseData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -15,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e2e8f0"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="period"
                      tick={{
                        fontSize: 11,
                        fill: '#64748b',
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      tick={{
                        fontSize: 11,
                        fill: '#64748b',
                      }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) =>
                        `₹${formatCurrency(value)}`
                      }
                    />

                    <Tooltip
                      formatter={(value) =>
                        `₹${formatCurrency(value)}`
                      }
                      contentStyle={{
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        boxShadow:
                          '0 10px 25px rgba(15, 23, 42, 0.08)',
                        fontSize: '12px',
                      }}
                    />

                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#f43f5e"
                      strokeWidth={2.5}
                      dot={{
                        r: 3,
                        fill: '#f43f5e',
                        strokeWidth: 0,
                      }}
                      activeDot={{
                        r: 5,
                      }}
                    />
                  </LineChart>
                ) : (
                  <BarChart
                    data={expenseData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -15,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e2e8f0"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="period"
                      tick={{
                        fontSize: 10,
                        fill: '#64748b',
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      tick={{
                        fontSize: 11,
                        fill: '#64748b',
                      }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) =>
                        `₹${formatCurrency(value)}`
                      }
                    />

                    <Tooltip
                      formatter={(value) =>
                        `₹${formatCurrency(value)}`
                      }
                      cursor={{
                        fill: '#f8fafc',
                      }}
                      contentStyle={{
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        boxShadow:
                          '0 10px 25px rgba(15, 23, 42, 0.08)',
                        fontSize: '12px',
                      }}
                    />

                    <Bar
                      dataKey="value"
                      fill="#f43f5e"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={42}
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom Insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-200">
            {isPositive ? (
              <FiTrendingUp size={16} />
            ) : (
              <FiTrendingDown size={16} />
            )}
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Financial Insight
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
              {transactions.length === 0
                ? 'Start adding transactions to unlock your financial insights.'
                : isPositive
                  ? `You currently have ₹${formatCurrency(
                      budgetLeft
                    )} more income than expenses.`
                  : `Your expenses are ₹${formatCurrency(
                      Math.abs(budgetLeft)
                    )} higher than your income.`}
            </p>

            {transactions.length > 0 && (
              <p className="mt-1 text-xs text-slate-500">
                {totalIncome > 0
                  ? `Your current savings rate is ${savingsRate}%.`
                  : 'Add income transactions to calculate your savings rate.'}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default DashboardCharts;



// // src/components/DashboardCharts.jsx
// import React, { useState } from "react";
// import {
//     PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line
// } from 'recharts';

// const COLORS = ['#28a745', '#dc3545'];

// const DashboardCharts = ({ transactions }) => {
//     const [viewMode, setViewMode] = useState("monthly");

//     const income = transactions.filter(t => t.type === 'income');
//     const expense = transactions.filter(t => t.type === 'expense');

//     const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
//     const totalExpense = expense.reduce((acc, curr) => acc + curr.amount, 0);
//     const budgetLeft = totalIncome - totalExpense;

//     const pieData = [
//         { name: 'Income', value: totalIncome },
//         { name: 'Expense', value: totalExpense }
//     ];

//     const groupByPeriod = (txns, mode) => {
//         const grouped = {};
//         txns.forEach(txn => {
//             const date = new Date(txn.date);
//             let key = "";
//             if (mode === "weekly") {
//                 const week = Math.ceil(date.getDate() / 7);
//                 key = `W${week}-${date.toLocaleString('default', { month: 'short' })}`;
//             } else if (mode === "monthly") {
//                 key = date.toLocaleString('default', { month: 'short', year: 'numeric' });
//             } else if (mode === "yearly") {
//                 key = date.getFullYear().toString();
//             } else {
//                 key = date.toISOString().split("T")[0];
//             }
//             grouped[key] = (grouped[key] || 0) + txn.amount;
//         });

//         return Object.entries(grouped).map(([period, value]) => ({ period, value }));
//     };

//     const expenseData = groupByPeriod(expense, viewMode);

//     return (
//         <div className="row mb-5">
//             <div className="col-md-4">
//                 <div className="card shadow mb-3">
//                     <div className="card-body text-center">
//                         <h5>Total Income</h5>
//                         <p className="text-success">₹{totalIncome}</p>
//                     </div>
//                 </div>
//                 <div className="card shadow mb-3">
//                     <div className="card-body text-center">
//                         <h5>Total Expense</h5>
//                         <p className="text-danger">₹{totalExpense}</p>
//                     </div>
//                 </div>
//                 <div className="card shadow mb-3">
//                     <div className="card-body text-center">
//                         <h5>Difference Income Vs Expense</h5>
//                         <p className={budgetLeft >= 0 ? 'text-success' : 'text-danger'}>
//                             ₹{budgetLeft}
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             <div className="col-md-4">
//                 <h5 className="text-center">Income vs Expense</h5>
//                 <ResponsiveContainer width="100%" height={250}>
//                     <PieChart>
//                         <Pie
//                             data={pieData}
//                             cx="50%"
//                             cy="50%"
//                             label
//                             outerRadius={80}
//                             fill="#8884d8"
//                             dataKey="value"
//                         >
//                             {pieData.map((_, index) => (
//                                 <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                             ))}
//                         </Pie>
//                         <Tooltip />
//                     </PieChart>
//                 </ResponsiveContainer>
//             </div>

//             <div className="col-md-4">
//                 <h5 className="text-center">Expense Trends</h5>
//                 <div className="mb-2 text-center">
//                     <select value={viewMode} onChange={(e) => setViewMode(e.target.value)} className="form-select">
//                         <option value="weekly">Weekly</option>
//                         <option value="monthly">Monthly</option>
//                         <option value="yearly">Yearly</option>
//                         <option value="custom">Custom (Date wise)</option>
//                     </select>
//                 </div>
//                 <ResponsiveContainer width="100%" height={250}>
//                     {viewMode === 'yearly' ? (
//                         <LineChart data={expenseData}>
//                             <XAxis dataKey="period" />
//                             <YAxis />
//                             <Tooltip />
//                             <Line type="monotone" dataKey="value" stroke="#dc3545" strokeWidth={2} />
//                         </LineChart>
//                     ) : (
//                         <BarChart data={expenseData}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="period" />
//                             <YAxis />
//                             <Tooltip />
//                             <Bar dataKey="value" fill="#dc3545" />
//                         </BarChart>
//                     )}
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// };

// export default DashboardCharts;
