// src/pages/Dashboard.jsx

import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiActivity,
    FiArrowDownLeft,
    FiArrowUpRight,
    FiCalendar,
    FiChevronRight,
    FiClock,
    FiDollarSign,
    FiEdit3,
    FiFilter,
    FiMail,
    FiPieChart,
    FiPlus,
    FiRefreshCw,
    FiSend,
    FiTrash2,
    FiTrendingDown,
    FiTrendingUp,
    FiX,
    FiBarChart2,
    FiCreditCard,
} from 'react-icons/fi';

import { API_URL } from '../config/api';

import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import FilterForm from '../components/FilterForm';
import AddTransactionForm from '../components/AddTransactionForm';
import EditTransactionForm from '../components/EditTransactionForm';
import GenerateReport from '../components/GenerateReport';
import Budget from '../components/Budget';

import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const COLORS = [
    '#2563eb',
    '#7c3aed',
    '#06b6d4',
    '#10b981',
    '#f59e0b',
    '#f43f5e',
    '#8b5cf6',
    '#14b8a6',
];


const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.45,
            staggerChildren: 0.06,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 18,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: 'easeOut',
        },
    },
};

const cardHover = {
    y: -3,
    transition: {
        duration: 0.2,
    },
};

const formatCurrency = (amount = 0) =>
    new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(Number(amount) || 0);

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [showAddTransactionForm, setShowAddTransactionForm] =
        useState(false);

    const [editingTransaction, setEditingTransaction] = useState(null);
    const [budgetWarning, setBudgetWarning] = useState(null);

    const [activeTab, setActiveTab] = useState('overview');
    const [trendView, setTrendView] = useState('monthly');

    const [customStart, setCustomStart] = useState('');
    const [customEnd, setCustomEnd] = useState('');

    const [sendingReceipt, setSendingReceipt] = useState(null);

    // ---------------------------------------------------------
    // Fetch Transactions
    // ---------------------------------------------------------

    const fetchTransactions = async (applyFilters = false) => {
        const token = localStorage.getItem('token');

        try {
            setError('');

            let url = `${API_URL}/transaction`;

            if (applyFilters) {
                const queryParams = new URLSearchParams();

                if (type) queryParams.append('type', type);
                if (category) queryParams.append('category', category);
                if (startDate) queryParams.append('startDate', startDate);
                if (endDate) queryParams.append('endDate', endDate);

                const query = queryParams.toString();

                if (query) {
                    url += `?${query}`;
                }
            }

            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTransactions(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch transactions.');
            setLoading(false);
        }
    };

    // ---------------------------------------------------------
    // Edit Transaction
    // ---------------------------------------------------------

    const handleEditTransaction = async (transactionId, updatedData) => {
        const token = localStorage.getItem('token');

        try {
            await axios.put(
                `${API_URL}/transaction/${transactionId}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setEditingTransaction(null);
            fetchTransactions();
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };

    // ---------------------------------------------------------
    // Delete Transaction
    // ---------------------------------------------------------

    const handleDeleteTransaction = async (transactionId) => {
        const token = localStorage.getItem('token');

        try {
            await axios.delete(
                `${API_URL}/transaction/${transactionId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchTransactions();
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    // ---------------------------------------------------------
    // Filters
    // ---------------------------------------------------------

    const handleFilter = () => {
        setLoading(true);
        fetchTransactions(true);
    };

    const clearFilters = () => {
        setType('');
        setCategory('');
        setStartDate('');
        setEndDate('');

        setLoading(true);

        setTimeout(() => {
            fetchTransactions(false);
        }, 0);
    };

    // ---------------------------------------------------------
    // Editing
    // ---------------------------------------------------------

    const startEditing = (transaction) => {
        setEditingTransaction(transaction);
    };

    const cancelEditing = () => {
        setEditingTransaction(null);
    };

    // ---------------------------------------------------------
    // Budget Status
    // ---------------------------------------------------------

    const checkBudgetStatus = async () => {
        const token = localStorage.getItem('token');

        try {
            const res = await axios.get(`${API_URL}/budget-status`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { overBudget, totalExpense } = res.data;

            if (overBudget) {
                setBudgetWarning(
                    `You've spent ${formatCurrency(totalExpense)} of your budget.`
                );
            } else {
                setBudgetWarning(null);
            }
        } catch (err) {
            console.error('Failed to check budget status:', err);
        }
    };

    // ---------------------------------------------------------
    // Initial Load
    // ---------------------------------------------------------

    useEffect(() => {
        fetchTransactions();
        checkBudgetStatus();
    }, []);

    // ---------------------------------------------------------
    // Grouping
    // ---------------------------------------------------------

    const groupBy = (dateStr, view) => {
        const date = new Date(dateStr);

        if (view === 'weekly') {
            const start = new Date(date);

            start.setDate(start.getDate() - start.getDay());

            return `Week of ${start.toLocaleDateString('en-IN')}`;
        }

        if (view === 'monthly') {
            return date.toLocaleString('default', {
                month: 'short',
                year: 'numeric',
            });
        }

        if (view === 'yearly') {
            return `${date.getFullYear()}`;
        }

        return date.toLocaleDateString('en-IN');
    };

    // ---------------------------------------------------------
    // Trend Filtering
    // ---------------------------------------------------------

    const filteredTransactions = useMemo(() => {
        return transactions.filter((txn) => {
            if (trendView !== 'custom') return true;

            if (!customStart || !customEnd) return true;

            const txnDate = new Date(txn.date);
            const start = new Date(customStart);
            const end = new Date(customEnd);

            end.setHours(23, 59, 59, 999);

            return txnDate >= start && txnDate <= end;
        });
    }, [transactions, trendView, customStart, customEnd]);

    // ---------------------------------------------------------
    // Chart Data
    // ---------------------------------------------------------

    const chartData = useMemo(() => {
        return filteredTransactions.reduce((acc, txn) => {
            const key = groupBy(txn.date, trendView);

            const found = acc.find((item) => item.date === key);

            if (found) {
                if (txn.type === 'income') {
                    found.income += Number(txn.amount);
                } else {
                    found.expense += Number(txn.amount);
                }
            } else {
                acc.push({
                    date: key,
                    income:
                        txn.type === 'income'
                            ? Number(txn.amount)
                            : 0,
                    expense:
                        txn.type === 'expense'
                            ? Number(txn.amount)
                            : 0,
                });
            }

            return acc;
        }, []);
    }, [filteredTransactions, trendView]);

    // ---------------------------------------------------------
    // Pie Data
    // ---------------------------------------------------------

    const pieData = useMemo(() => {
        return transactions.reduce((acc, txn) => {
            const found = acc.find(
                (item) => item.name === txn.category
            );

            if (found) {
                found.value += Number(txn.amount);
            } else {
                acc.push({
                    name: txn.category,
                    value: Number(txn.amount),
                });
            }

            return acc;
        }, []);
    }, [transactions]);

    // ---------------------------------------------------------
    // Financial Summary
    // ---------------------------------------------------------

    const summary = useMemo(() => {
        const income = transactions
            .filter((txn) => txn.type === 'income')
            .reduce((sum, txn) => sum + Number(txn.amount || 0), 0);

        const expense = transactions
            .filter((txn) => txn.type === 'expense')
            .reduce((sum, txn) => sum + Number(txn.amount || 0), 0);

        const balance = income - expense;

        return {
            income,
            expense,
            balance,
            count: transactions.length,
        };
    }, [transactions]);

    // ---------------------------------------------------------
    // Send Receipt
    // ---------------------------------------------------------

    const sendReceipt = async (txn) => {
        const email = window.prompt(
            'Enter the email address to send the receipt:'
        );

        if (!email) {
            window.alert('Email is required to send the receipt.');
            return;
        }

        const payload = {
            email,
            data: {
                amount: txn.amount,
                date: new Date(txn.date).toLocaleDateString(),
                category: txn.category,
                note: txn.note || '',
            },
        };

        try {
            setSendingReceipt(txn._id);

            const response = await axios.post(
                `${API_URL}/send-receipt`,
                payload
            );

            window.alert(
                response.data.message ||
                    'Receipt sent successfully!'
            );
        } catch (error) {
            console.error('Error sending receipt:', error);
            window.alert(
                'Failed to send receipt. Please try again.'
            );
        } finally {
            setSendingReceipt(null);
        }
    };

    // ---------------------------------------------------------
    // Tabs
    // ---------------------------------------------------------

    const tabs = [
        {
            id: 'overview',
            label: 'Overview',
            icon: FiActivity,
        },
        {
            id: 'trends',
            label: 'Trends',
            icon: FiBarChart2,
        },
        {
            id: 'breakdown',
            label: 'Breakdown',
            icon: FiPieChart,
        },
    ];

    // ---------------------------------------------------------
    // Loading Skeleton
    // ---------------------------------------------------------

    const TransactionSkeleton = () => (
        <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
                <div
                    key={item}
                    className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                            <div className="h-11 w-11 rounded-xl bg-slate-100" />

                            <div>
                                <div className="mb-2 h-4 w-28 rounded bg-slate-100" />
                                <div className="h-3 w-20 rounded bg-slate-100" />
                            </div>
                        </div>

                        <div className="h-5 w-20 rounded bg-slate-100" />
                    </div>

                    <div className="mt-5 h-3 w-full rounded bg-slate-100" />
                    <div className="mt-2 h-3 w-2/3 rounded bg-slate-100" />

                    <div className="mt-5 flex gap-2">
                        <div className="h-9 flex-1 rounded-lg bg-slate-100" />
                        <div className="h-9 flex-1 rounded-lg bg-slate-100" />
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-slate-50">
                {/* Background decoration */}
                <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
                    <div className="absolute -left-40 top-40 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />
                    <div className="absolute -right-40 top-96 h-96 w-96 rounded-full bg-violet-100/50 blur-3xl" />

                    <div
                        className="absolute inset-0 opacity-[0.025]"
                        style={{
                            backgroundImage:
                                'linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />
                </div>

                <motion.div
                    className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8"
                    initial="hidden"
                    animate="visible"
                    variants={pageVariants}
                >
                    {/* =====================================================
                        Header
                    ====================================================== */}

                    <motion.section
                        variants={itemVariants}
                        className="mb-8"
                    >
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
                                    <FiActivity size={13} />
                                    Financial Overview
                                </div>

                                <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                                    Your financial
                                    <span className="ml-2 bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
                                        dashboard
                                    </span>
                                </h1>

                                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                                    Track your money, understand your spending,
                                    and stay in control of your financial goals.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    fetchTransactions();
                                    checkBudgetStatus();
                                }}
                                className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                            >
                                <FiRefreshCw
                                    size={16}
                                    className="transition-transform duration-300 group-hover:rotate-180"
                                />
                                Refresh
                            </button>
                        </div>
                    </motion.section>

                    {/* =====================================================
                        Summary Cards
                    ====================================================== */}

                    <motion.section
                        variants={itemVariants}
                        className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
                    >
                        {/* Balance */}
                        <motion.div
                            whileHover={cardHover}
                            className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                        >
                            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-50" />

                            <div className="relative">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <FiDollarSign size={20} />
                                    </div>

                                    <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-600">
                                        Balance
                                    </span>
                                </div>

                                <p className="text-sm font-medium text-slate-500">
                                    Current Balance
                                </p>

                                <h2
                                    className={`mt-1 text-2xl font-black ${
                                        summary.balance >= 0
                                            ? 'text-slate-900'
                                            : 'text-rose-600'
                                    }`}
                                >
                                    {formatCurrency(summary.balance)}
                                </h2>

                                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                                    <FiCreditCard size={13} />
                                    Net financial position
                                </div>
                            </div>
                        </motion.div>

                        {/* Income */}
                        <motion.div
                            whileHover={cardHover}
                            className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm"
                        >
                            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-50" />

                            <div className="relative">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                        <FiArrowUpRight size={20} />
                                    </div>

                                    <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600">
                                        Income
                                    </span>
                                </div>

                                <p className="text-sm font-medium text-slate-500">
                                    Total Income
                                </p>

                                <h2 className="mt-1 text-2xl font-black text-slate-900">
                                    {formatCurrency(summary.income)}
                                </h2>

                                <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600">
                                    <FiTrendingUp size={13} />
                                    Money received
                                </div>
                            </div>
                        </motion.div>

                        {/* Expenses */}
                        <motion.div
                            whileHover={cardHover}
                            className="relative overflow-hidden rounded-2xl border border-rose-100 bg-white p-5 shadow-sm"
                        >
                            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-rose-50" />

                            <div className="relative">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                                        <FiArrowDownLeft size={20} />
                                    </div>

                                    <span className="rounded-full border border-rose-100 bg-rose-50 px-2.5 py-1 text-[11px] font-bold text-rose-600">
                                        Expenses
                                    </span>
                                </div>

                                <p className="text-sm font-medium text-slate-500">
                                    Total Expenses
                                </p>

                                <h2 className="mt-1 text-2xl font-black text-slate-900">
                                    {formatCurrency(summary.expense)}
                                </h2>

                                <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-600">
                                    <FiTrendingDown size={13} />
                                    Money spent
                                </div>
                            </div>
                        </motion.div>

                        {/* Transactions */}
                        <motion.div
                            whileHover={cardHover}
                            className="relative overflow-hidden rounded-2xl border border-violet-100 bg-white p-5 shadow-sm"
                        >
                            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-50" />

                            <div className="relative">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                        <FiActivity size={20} />
                                    </div>

                                    <span className="rounded-full border border-violet-100 bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-600">
                                        Activity
                                    </span>
                                </div>

                                <p className="text-sm font-medium text-slate-500">
                                    Transactions
                                </p>

                                <h2 className="mt-1 text-2xl font-black text-slate-900">
                                    {summary.count}
                                </h2>

                                <div className="mt-3 flex items-center gap-1.5 text-xs text-violet-600">
                                    <FiClock size={13} />
                                    Recorded transactions
                                </div>
                            </div>
                        </motion.div>
                    </motion.section>

                    {/* =====================================================
                        Budget
                    ====================================================== */}

                    <motion.section
                        variants={itemVariants}
                        className="mb-8"
                    >
                        <div className="mb-3 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                <FiCreditCard size={16} />
                            </div>

                            <div>
                                <h2 className="text-base font-black text-slate-900">
                                    Budget Overview
                                </h2>

                                <p className="text-xs text-slate-500">
                                    Monitor your spending limits
                                </p>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <Budget />
                        </div>
                    </motion.section>

                    {/* =====================================================
                        Filters
                    ====================================================== */}

                    <motion.section
                        variants={itemVariants}
                        className="mb-6"
                    >
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                                            <FiFilter size={18} />
                                        </div>

                                        <div>
                                            <h2 className="font-black text-slate-900">
                                                Transaction Filters
                                            </h2>

                                            <p className="text-xs text-slate-500">
                                                Narrow down your transaction history
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500 transition-colors hover:text-blue-600"
                                    >
                                        <FiX size={14} />
                                        Clear filters
                                    </button>
                                </div>
                            </div>

                            <div className="p-5 sm:p-6">
                                <FilterForm
                                    type={type}
                                    setType={setType}
                                    category={category}
                                    setCategory={setCategory}
                                    startDate={startDate}
                                    setStartDate={setStartDate}
                                    endDate={endDate}
                                    setEndDate={setEndDate}
                                    handleFilter={handleFilter}
                                />
                            </div>
                        </div>
                    </motion.section>

                    {/* =====================================================
                        Add Transaction
                    ====================================================== */}

                    <motion.section
                        variants={itemVariants}
                        className="mb-8"
                    >
                        <button
                            type="button"
                            onClick={() =>
                                setShowAddTransactionForm(
                                    !showAddTransactionForm
                                )
                            }
                            className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-5 text-sm font-bold text-blue-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50"
                        >
                            <FiPlus
                                size={18}
                                className={`transition-transform duration-300 ${
                                    showAddTransactionForm
                                        ? 'rotate-45'
                                        : 'group-hover:rotate-90'
                                }`}
                            />

                            {showAddTransactionForm
                                ? 'Close Transaction Form'
                                : 'Add New Transaction'}
                        </button>

                        <AnimatePresence initial={false}>
                            {showAddTransactionForm && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        height: 0,
                                        y: -10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        height: 'auto',
                                        y: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        height: 0,
                                        y: -10,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                        <AddTransactionForm
                                            fetchTransactions={
                                                fetchTransactions
                                            }
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.section>

                    {/* =====================================================
                        Budget Warning
                    ====================================================== */}

                    <AnimatePresence>
                        {budgetWarning && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: -10,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -10,
                                }}
                                className="mb-6 overflow-hidden rounded-2xl border border-amber-200 bg-amber-50"
                            >
                                <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
                                            <FiTrendingDown size={18} />
                                        </div>

                                        <div>
                                            <p className="text-sm font-black text-amber-900">
                                                Budget alert
                                            </p>

                                            <p className="text-xs text-amber-700">
                                                {budgetWarning}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setBudgetWarning(null)
                                        }
                                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-amber-200 bg-white px-3 py-2 text-xs font-bold text-amber-700 transition hover:bg-amber-100"
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* =====================================================
                        Analytics
                    ====================================================== */}

                    <motion.section
                        variants={itemVariants}
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                    >
                        {/* Tabs */}
                        <div className="border-b border-slate-100 px-4 pt-4 sm:px-6">
                            <div className="flex gap-1 overflow-x-auto">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive =
                                        activeTab === tab.id;

                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() =>
                                                setActiveTab(tab.id)
                                            }
                                            className={`relative inline-flex shrink-0 items-center gap-2 rounded-t-xl px-4 py-3 text-sm font-bold transition-all ${
                                                isActive
                                                    ? 'bg-blue-50 text-blue-600'
                                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                                            }`}
                                        >
                                            <Icon size={16} />
                                            {tab.label}

                                            {isActive && (
                                                <motion.span
                                                    layoutId="dashboard-tab"
                                                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-blue-600"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="p-4 sm:p-6">
                            {/* =================================================
                                Overview
                            ================================================== */}

                            {activeTab === 'overview' && (
                                <div>
                                    <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                                        <div>
                                            <h2 className="text-xl font-black text-slate-900">
                                                Recent Transactions
                                            </h2>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Review and manage your latest
                                                financial activity.
                                            </p>
                                        </div>

                                        {transactions.length > 0 && (
                                            <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
                                                {transactions.length}{' '}
                                                transaction
                                                {transactions.length !== 1
                                                    ? 's'
                                                    : ''}
                                            </div>
                                        )}
                                    </div>

                                    {loading ? (
                                        <TransactionSkeleton />
                                    ) : error ? (
                                        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center">
                                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-rose-500 shadow-sm">
                                                <FiRefreshCw size={20} />
                                            </div>

                                            <h3 className="mt-4 font-black text-rose-900">
                                                Unable to load transactions
                                            </h3>

                                            <p className="mt-1 text-sm text-rose-700">
                                                {error}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setLoading(true);
                                                    fetchTransactions();
                                                }}
                                                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-bold text-rose-600 shadow-sm transition hover:bg-rose-50"
                                            >
                                                <FiRefreshCw size={15} />
                                                Try again
                                            </button>
                                        </div>
                                    ) : transactions.length === 0 ? (
                                        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
                                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
                                                <FiCreditCard size={24} />
                                            </div>

                                            <h3 className="mt-4 font-black text-slate-900">
                                                No transactions found
                                            </h3>

                                            <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
                                                Add your first transaction to
                                                start tracking your financial
                                                activity.
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowAddTransactionForm(
                                                        true
                                                    )
                                                }
                                                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
                                            >
                                                <FiPlus size={16} />
                                                Add Transaction
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {transactions.map(
                                                (txn, index) => {
                                                    const isIncome =
                                                        txn.type ===
                                                        'income';

                                                    return (
                                                        <motion.div
                                                            key={txn._id}
                                                            layout
                                                            initial={{
                                                                opacity: 0,
                                                                y: 15,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                y: 0,
                                                            }}
                                                            transition={{
                                                                duration: 0.35,
                                                                delay:
                                                                    index *
                                                                    0.03,
                                                            }}
                                                            whileHover={{
                                                                y: -3,
                                                            }}
                                                            className={`group overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md ${
                                                                isIncome
                                                                    ? 'border-emerald-100'
                                                                    : 'border-rose-100'
                                                            }`}
                                                        >
                                                            {editingTransaction &&
                                                            editingTransaction._id ===
                                                                txn._id ? (
                                                                <div className="p-5 sm:p-6">
                                                                    <EditTransactionForm
                                                                        transaction={
                                                                            txn
                                                                        }
                                                                        onSubmit={
                                                                            handleEditTransaction
                                                                        }
                                                                        onCancel={
                                                                            cancelEditing
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    {/* Card Header */}
                                                                    <div className="p-5 sm:p-6">
                                                                        <div className="flex items-start justify-between gap-4">
                                                                            <div className="flex min-w-0 items-center gap-3">
                                                                                <div
                                                                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                                                                                        isIncome
                                                                                            ? 'bg-emerald-50 text-emerald-600'
                                                                                            : 'bg-rose-50 text-rose-600'
                                                                                    }`}
                                                                                >
                                                                                    {isIncome ? (
                                                                                        <FiArrowUpRight
                                                                                            size={
                                                                                                20
                                                                                            }
                                                                                        />
                                                                                    ) : (
                                                                                        <FiArrowDownLeft
                                                                                            size={
                                                                                                20
                                                                                            }
                                                                                        />
                                                                                    )}
                                                                                </div>

                                                                                <div className="min-w-0">
                                                                                    <div className="flex items-center gap-2">
                                                                                        <h3 className="truncate font-black text-slate-900">
                                                                                            {
                                                                                                txn.category
                                                                                            }
                                                                                        </h3>
                                                                                    </div>

                                                                                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                                                                                        <FiCalendar
                                                                                            size={
                                                                                                12
                                                                                            }
                                                                                        />

                                                                                        {new Date(
                                                                                            txn.date
                                                                                        ).toLocaleDateString(
                                                                                            'en-IN',
                                                                                            {
                                                                                                day: '2-digit',
                                                                                                month: 'short',
                                                                                                year: 'numeric',
                                                                                            }
                                                                                        )}
                                                                                    </p>
                                                                                </div>
                                                                            </div>

                                                                            <div className="text-right">
                                                                                <p
                                                                                    className={`whitespace-nowrap text-lg font-black ${
                                                                                        isIncome
                                                                                            ? 'text-emerald-600'
                                                                                            : 'text-rose-600'
                                                                                    }`}
                                                                                >
                                                                                    {isIncome
                                                                                        ? '+'
                                                                                        : '-'}
                                                                                    {formatCurrency(
                                                                                        txn.amount
                                                                                    )}
                                                                                </p>

                                                                                <span
                                                                                    className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${
                                                                                        isIncome
                                                                                            ? 'bg-emerald-50 text-emerald-600'
                                                                                            : 'bg-rose-50 text-rose-600'
                                                                                    }`}
                                                                                >
                                                                                    {
                                                                                        txn.type
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </div>

                                                                        {/* Note */}
                                                                        <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3">
                                                                            <p className="text-sm leading-5 text-slate-600">
                                                                                {txn.note ||
                                                                                    'No note added for this transaction.'}
                                                                            </p>
                                                                        </div>

                                                                        {/* Actions */}
                                                                        <div className="mt-4 flex flex-wrap gap-2">
                                                                            <button
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    startEditing(
                                                                                        txn
                                                                                    )
                                                                                }
                                                                                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                                                                            >
                                                                                <FiEdit3
                                                                                    size={
                                                                                        14
                                                                                    }
                                                                                />
                                                                                Edit
                                                                            </button>

                                                                            <button
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    handleDeleteTransaction(
                                                                                        txn._id
                                                                                    )
                                                                                }
                                                                                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-rose-100 bg-white px-3 py-2 text-xs font-bold text-rose-500 transition hover:border-rose-200 hover:bg-rose-50"
                                                                            >
                                                                                <FiTrash2
                                                                                    size={
                                                                                        14
                                                                                    }
                                                                                />
                                                                                Delete
                                                                            </button>

                                                                            <button
                                                                                type="button"
                                                                                disabled={
                                                                                    sendingReceipt ===
                                                                                    txn._id
                                                                                }
                                                                                onClick={() =>
                                                                                    sendReceipt(
                                                                                        txn
                                                                                    )
                                                                                }
                                                                                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                                            >
                                                                                <FiSend
                                                                                    size={
                                                                                        14
                                                                                    }
                                                                                />

                                                                                {sendingReceipt ===
                                                                                txn._id
                                                                                    ? 'Sending...'
                                                                                    : 'Receipt'}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </motion.div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    )}

                                    <div className="mt-6 border-t border-slate-100 pt-6">
                                        <GenerateReport />
                                    </div>
                                </div>
                            )}

                            {/* =================================================
                                Trends
                            ================================================== */}

                            {activeTab === 'trends' && (
                                <div>
                                    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                                        <div>
                                            <h2 className="text-xl font-black text-slate-900">
                                                Income vs Expenses
                                            </h2>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Understand how your financial
                                                activity changes over time.
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <select
                                                id="trendView"
                                                value={trendView}
                                                onChange={(e) =>
                                                    setTrendView(
                                                        e.target.value
                                                    )
                                                }
                                                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                                            >
                                                <option value="weekly">
                                                    Weekly
                                                </option>

                                                <option value="monthly">
                                                    Monthly
                                                </option>

                                                <option value="yearly">
                                                    Yearly
                                                </option>

                                                <option value="custom">
                                                    Custom
                                                </option>
                                            </select>

                                            {trendView === 'custom' && (
                                                <>
                                                    <input
                                                        type="date"
                                                        value={
                                                            customStart
                                                        }
                                                        onChange={(e) =>
                                                            setCustomStart(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                                                    />

                                                    <span className="text-xs font-bold text-slate-400">
                                                        to
                                                    </span>

                                                    <input
                                                        type="date"
                                                        value={customEnd}
                                                        onChange={(e) =>
                                                            setCustomEnd(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="h-[360px] w-full rounded-2xl border border-slate-100 bg-slate-50/50 p-3 sm:p-5">
                                        {chartData.length === 0 ? (
                                            <div className="flex h-full flex-col items-center justify-center text-center">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
                                                    <FiBarChart2
                                                        size={22}
                                                    />
                                                </div>

                                                <p className="mt-3 text-sm font-bold text-slate-700">
                                                    Not enough data
                                                </p>

                                                <p className="mt-1 text-xs text-slate-400">
                                                    Add transactions to see your
                                                    financial trends.
                                                </p>
                                            </div>
                                        ) : (
                                            <ResponsiveContainer
                                                width="100%"
                                                height="100%"
                                            >
                                                <BarChart
                                                    data={chartData}
                                                    margin={{
                                                        top: 10,
                                                        right: 10,
                                                        left: 0,
                                                        bottom: 5,
                                                    }}
                                                    barGap={8}
                                                >
                                                    <CartesianGrid
                                                        strokeDasharray="3 3"
                                                        vertical={false}
                                                        stroke="#e2e8f0"
                                                    />

                                                    <XAxis
                                                        dataKey="date"
                                                        tick={{
                                                            fill: '#64748b',
                                                            fontSize: 11,
                                                        }}
                                                        axisLine={false}
                                                        tickLine={false}
                                                    />

                                                    <YAxis
                                                        tick={{
                                                            fill: '#64748b',
                                                            fontSize: 11,
                                                        }}
                                                        axisLine={false}
                                                        tickLine={false}
                                                        tickFormatter={(
                                                            value
                                                        ) =>
                                                            `₹${Number(
                                                                value
                                                            ).toLocaleString(
                                                                'en-IN'
                                                            )}`
                                                        }
                                                    />

                                                    <Tooltip
                                                        formatter={(
                                                            value,
                                                            name
                                                        ) => [
                                                            formatCurrency(
                                                                value
                                                            ),
                                                            name ===
                                                            'income'
                                                                ? 'Income'
                                                                : 'Expense',
                                                        ]}
                                                        contentStyle={{
                                                            borderRadius:
                                                                '12px',
                                                            border: '1px solid #e2e8f0',
                                                            boxShadow:
                                                                '0 10px 30px rgba(15, 23, 42, 0.08)',
                                                        }}
                                                    />

                                                    <Legend
                                                        verticalAlign="top"
                                                        align="right"
                                                        iconType="circle"
                                                        wrapperStyle={{
                                                            paddingBottom:
                                                                '20px',
                                                            fontSize:
                                                                '12px',
                                                        }}
                                                    />

                                                    <Bar
                                                        dataKey="income"
                                                        name="Income"
                                                        fill="#10b981"
                                                        radius={[
                                                            6, 6, 0, 0,
                                                        ]}
                                                        maxBarSize={36}
                                                    />

                                                    <Bar
                                                        dataKey="expense"
                                                        name="Expense"
                                                        fill="#f43f5e"
                                                        radius={[
                                                            6, 6, 0, 0,
                                                        ]}
                                                        maxBarSize={36}
                                                    />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* =================================================
                                Breakdown
                            ================================================== */}

                            {activeTab === 'breakdown' && (
                                <div>
                                    <div className="mb-6">
                                        <h2 className="text-xl font-black text-slate-900">
                                            Spending Breakdown
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            See where your money is going by
                                            category.
                                        </p>
                                    </div>

                                    {pieData.length === 0 ? (
                                        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-center">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
                                                <FiPieChart size={22} />
                                            </div>

                                            <p className="mt-3 text-sm font-bold text-slate-700">
                                                No category data available
                                            </p>

                                            <p className="mt-1 text-xs text-slate-400">
                                                Add some transactions to see
                                                your spending breakdown.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
                                            <div className="h-[360px] w-full rounded-2xl border border-slate-100 bg-slate-50/50 p-3 sm:p-5">
                                                <ResponsiveContainer
                                                    width="100%"
                                                    height="100%"
                                                >
                                                    <PieChart>
                                                        <Pie
                                                            data={
                                                                pieData
                                                            }
                                                            cx="50%"
                                                            cy="50%"
                                                            labelLine={
                                                                false
                                                            }
                                                            label={({
                                                                name,
                                                                percent,
                                                            }) =>
                                                                `${name} (${(
                                                                    percent *
                                                                    100
                                                                ).toFixed(
                                                                    0
                                                                )}%)`
                                                            }
                                                            outerRadius="72%"
                                                            innerRadius="42%"
                                                            paddingAngle={
                                                                3
                                                            }
                                                            dataKey="value"
                                                        >
                                                            {pieData.map(
                                                                (
                                                                    entry,
                                                                    index
                                                                ) => (
                                                                    <Cell
                                                                        key={`cell-${index}`}
                                                                        fill={
                                                                            COLORS[
                                                                                index %
                                                                                    COLORS.length
                                                                            ]
                                                                        }
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        stroke="#ffffff"
                                                                    />
                                                                )
                                                            )}
                                                        </Pie>

                                                        <Tooltip
                                                            formatter={(
                                                                value
                                                            ) =>
                                                                formatCurrency(
                                                                    value
                                                                )
                                                            }
                                                            contentStyle={{
                                                                borderRadius:
                                                                    '12px',
                                                                border: '1px solid #e2e8f0',
                                                                boxShadow:
                                                                    '0 10px 30px rgba(15, 23, 42, 0.08)',
                                                            }}
                                                        />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>

                                            <div className="space-y-2">
                                                {pieData.map(
                                                    (entry, index) => {
                                                        const total =
                                                            pieData.reduce(
                                                                (
                                                                    sum,
                                                                    item
                                                                ) =>
                                                                    sum +
                                                                    item.value,
                                                                0
                                                            );

                                                        const percentage =
                                                            total
                                                                ? (
                                                                      (entry.value /
                                                                          total) *
                                                                      100
                                                                  ).toFixed(
                                                                      1
                                                                  )
                                                                : 0;

                                                        return (
                                                            <motion.div
                                                                key={
                                                                    entry.name
                                                                }
                                                                whileHover={{
                                                                    x: 3,
                                                                }}
                                                                className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm"
                                                            >
                                                                <div className="flex min-w-0 items-center gap-3">
                                                                    <span
                                                                        className="h-3 w-3 shrink-0 rounded-full"
                                                                        style={{
                                                                            backgroundColor:
                                                                                COLORS[
                                                                                    index %
                                                                                        COLORS.length
                                                                                ],
                                                                        }}
                                                                    />

                                                                    <span className="truncate text-sm font-bold text-slate-700">
                                                                        {
                                                                            entry.name
                                                                        }
                                                                    </span>
                                                                </div>

                                                                <div className="ml-3 text-right">
                                                                    <p className="text-sm font-black text-slate-900">
                                                                        {formatCurrency(
                                                                            entry.value
                                                                        )}
                                                                    </p>

                                                                    <p className="text-[11px] font-semibold text-slate-400">
                                                                        {
                                                                            percentage
                                                                        }
                                                                        %
                                                                    </p>
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.section>

                    {/* =====================================================
                        Bottom Insight
                    ====================================================== */}

                    <motion.section
                        variants={itemVariants}
                        className="mt-6 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-violet-50"
                    >
                        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                                    <FiActivity size={18} />
                                </div>

                                <div>
                                    <p className="font-black text-slate-900">
                                        Keep your finances organized
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Regularly reviewing your transactions
                                        can help you make better financial
                                        decisions.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setActiveTab('trends')
                                }
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
                            >
                                View analytics
                                <FiChevronRight size={16} />
                            </button>
                        </div>
                    </motion.section>
                </motion.div>
            </main>
        </>
    );
};

export default Dashboard;



// // src/pages/Dashboard.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Navbar from '../components/navbar';
// import Footer from '../components/Footer';
// import FilterForm from '../components/FilterForm';
// import AddTransactionForm from '../components/AddTransactionForm';
// import EditTransactionForm from '../components/EditTransactionForm';
// import GenerateReport from '../components/GenerateReport';
// import Budget from '../components/Budget';
// import {
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#aa66cc', '#33b5e5'];

// const Dashboard = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [type, setType] = useState('');
//   const [category, setCategory] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [showAddTransactionForm, setShowAddTransactionForm] = useState(false);
//   const [editingTransaction, setEditingTransaction] = useState(null);
//   const [budgetWarning, setBudgetWarning] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [trendView, setTrendView] = useState('monthly');
//   const [customStart, setCustomStart] = useState('');
//   const [customEnd, setCustomEnd] = useState('');

//   const fetchTransactions = async (applyFilters = false) => {
//     const token = localStorage.getItem('token');

//     try {
//       let url = 'http://localhost:3000/api/transaction';
//       if (applyFilters) {
//         const queryParams = new URLSearchParams();
//         if (type) queryParams.append('type', type);
//         if (category) queryParams.append('category', category);
//         if (startDate) queryParams.append('startDate', startDate);
//         if (endDate) queryParams.append('endDate', endDate);
//         url += `?${queryParams.toString()}`;
//       }

//       const res = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setTransactions(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch transactions.');
//       setLoading(false);
//     }
//   };

//   const handleEditTransaction = async (transactionId, updatedData) => {
//     const token = localStorage.getItem('token');
//     try {
//       await axios.put(
//         `http://localhost:3000/api/transaction/${transactionId}`,
//         updatedData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setEditingTransaction(null);
//       fetchTransactions();
//     } catch (error) {
//       console.error('Error updating transaction:', error);
//     }
//   };

//   const handleDeleteTransaction = async (transactionId) => {
//     const token = localStorage.getItem('token');
//     try {
//       await axios.delete(
//         `http://localhost:3000/api/transaction/${transactionId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchTransactions();
//     } catch (error) {
//       console.error('Error deleting transaction:', error);
//     }
//   };

//   const handleFilter = () => {
//     setLoading(true);
//     fetchTransactions(true);
//   };

//   const startEditing = (transaction) => {
//     setEditingTransaction(transaction);
//   };

//   const cancelEditing = () => {
//     setEditingTransaction(null);
//   };

//   const checkBudgetStatus = async () => {
//     const token = localStorage.getItem('token');
//     try {
//       const res = await axios.get('http://localhost:3000/api/budget-status', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const { overBudget, totalExpense } = res.data;
//       if (overBudget) {
//         setBudgetWarning(`You've spent ₹${totalExpense} of your budget!`);
//       } else {
//         setBudgetWarning(null);
//       }
//     } catch (err) {
//       console.error('Failed to check budget status:', err);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//     checkBudgetStatus();
//   }, []);

//   const groupBy = (dateStr, view) => {
//     const date = new Date(dateStr);
//     if (view === 'weekly') {
//       const start = new Date(date.setDate(date.getDate() - date.getDay()));
//       return `Week of ${start.toLocaleDateString()}`;
//     }
//     if (view === 'monthly')
//       return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
//     if (view === 'yearly') return `${date.getFullYear()}`;
//     return new Date(dateStr).toLocaleDateString();
//   };

//   const filteredTransactions = transactions.filter((txn) => {
//     if (trendView !== 'custom') return true;
//     if (!customStart || !customEnd) return true;
//     const txnDate = new Date(txn.date);
//     return txnDate >= new Date(customStart) && txnDate <= new Date(customEnd);
//   });

//   const chartData = filteredTransactions.reduce((acc, txn) => {
//     const key = groupBy(txn.date, trendView);
//     const found = acc.find((item) => item.date === key);
//     if (found) {
//       found[txn.type] += txn.amount;
//     } else {
//       acc.push({
//         date: key,
//         income: txn.type === 'income' ? txn.amount : 0,
//         expense: txn.type === 'expense' ? txn.amount : 0,
//       });
//     }
//     return acc;
//   }, []);

//   const pieData = transactions.reduce((acc, txn) => {
//     const found = acc.find((item) => item.name === txn.category);
//     if (found) {
//       found.value += txn.amount;
//     } else {
//       acc.push({ name: txn.category, value: txn.amount });
//     }
//     return acc;
//   }, []);

//   const sendReceipt = async (txn) => {
//     const email = prompt('Enter the email address to send the receipt:');
//     if (!email) return alert('Email is required to send the receipt.');
//     const payload = {
//       email,
//       data: {
//         amount: txn.amount,
//         date: new Date(txn.date).toLocaleDateString(),
//         category: txn.category,
//         note: txn.note || '',
//       },
//     };
//     try {
//       const response = await axios.post('http://localhost:3000/api/send-receipt', payload);
//       alert(response.data.message || 'Receipt sent successfully!');
//     } catch (error) {
//       console.error('Error sending receipt:', error);
//       alert('Failed to send receipt. Please try again.');
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container my-5">
//         <h2 className="text-center mb-4">Welcome to Your Dashboard</h2>
//         <Budget />
//         <FilterForm
//           type={type}
//           setType={setType}
//           category={category}
//           setCategory={setCategory}
//           startDate={startDate}
//           setStartDate={setStartDate}
//           endDate={endDate}
//           setEndDate={setEndDate}
//           handleFilter={handleFilter}
//         />

//         <button
//           className="btn btn-primary mb-4"
//           onClick={() => setShowAddTransactionForm(!showAddTransactionForm)}
//         >
//           {showAddTransactionForm ? 'Close Form' : 'Add New Transaction'}
//         </button>

//         {showAddTransactionForm && (
//           <AddTransactionForm fetchTransactions={fetchTransactions} />
//         )}

//         {budgetWarning && (
//           <div className="alert alert-warning text-center">{budgetWarning}</div>
//         )}

//         <ul className="nav nav-tabs mb-3">
//           <li className="nav-item">
//             <button
//               className={`nav-link ${activeTab === 'overview' && 'active'}`}
//               onClick={() => setActiveTab('overview')}
//             >
//               Overview
//             </button>
//           </li>
//           <li className="nav-item">
//             <button
//               className={`nav-link ${activeTab === 'trends' && 'active'}`}
//               onClick={() => setActiveTab('trends')}
//             >
//               Trends
//             </button>
//           </li>
//           <li className="nav-item">
//             <button
//               className={`nav-link ${activeTab === 'breakdown' && 'active'}`}
//               onClick={() => setActiveTab('breakdown')}
//             >
//               Breakdown
//             </button>
//           </li>
//         </ul>

//         {activeTab === 'overview' && (
//           loading ? (
//             <div className="text-center">Loading...</div>
//           ) : error ? (
//             <div className="alert alert-danger text-center">{error}</div>
//           ) : (
//             <div className="row">
//               {transactions.length === 0 ? (
//                 <p className="text-center">No transactions found.</p>
//               ) : (
//                 transactions.map((txn) => (
//                   <div key={txn._id} className="col-md-6 mb-4">
//                     <div className={`card shadow border-left-${txn.type === 'income' ? 'success' : 'danger'}`}>
//                       <div className="card-body">
//                         {editingTransaction && editingTransaction._id === txn._id ? (
//                           <EditTransactionForm
//                             transaction={txn}
//                             onSubmit={handleEditTransaction}
//                             onCancel={cancelEditing}
//                           />
//                         ) : (
//                           <>
//                             <h5 className="card-title">
//                               ₹{txn.amount} - {txn.category}
//                             </h5>
//                             <p className="card-text">{txn.note || 'No note'}</p>
//                             <p className="card-text">
//                               <small className="text-muted">{new Date(txn.date).toLocaleDateString()}</small>
//                             </p>
//                             <button className="btn btn-primary btn-sm me-2" onClick={() => startEditing(txn)}>Edit</button>
//                             <button className="btn btn-danger btn-sm me-2" onClick={() => handleDeleteTransaction(txn._id)}>Delete</button>
//                             <button className="btn btn-secondary btn-sm" onClick={() => sendReceipt(txn)}>Send Receipt</button>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//               <GenerateReport />
//             </div>
//           )
//         )}

//         {activeTab === 'trends' && (
//           <>
//             <div className="mb-3 d-flex flex-wrap align-items-center gap-3">
//               <label htmlFor="trendView">Select View:</label>
//               <select
//                 id="trendView"
//                 className="form-select w-auto"
//                 value={trendView}
//                 onChange={(e) => setTrendView(e.target.value)}
//               >
//                 <option value="weekly">Weekly</option>
//                 <option value="monthly">Monthly</option>
//                 <option value="yearly">Yearly</option>
//                 <option value="custom">Custom</option>
//               </select>

//               {trendView === 'custom' && (
//                 <>
//                   <input
//                     type="date"
//                     className="form-control"
//                     value={customStart}
//                     onChange={(e) => setCustomStart(e.target.value)}
//                   />
//                   <input
//                     type="date"
//                     className="form-control"
//                     value={customEnd}
//                     onChange={(e) => setCustomEnd(e.target.value)}
//                   />
//                 </>
//               )}
//             </div>

//             <ResponsiveContainer width="100%" height={400}>
//               <BarChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="income" fill="#00C49F" />
//                 <Bar dataKey="expense" fill="#FF8042" />
//               </BarChart>
//             </ResponsiveContainer>
//           </>
//         )}

//         {activeTab === 'breakdown' && (
//           <ResponsiveContainer width="100%" height={400}>
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
//                 outerRadius={150}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Dashboard;
