import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCalendar,
  FiCheckCircle,
  FiChevronDown,
  FiDollarSign,
  FiEdit3,
  FiRefreshCw,
  FiTarget,
  FiTrendingDown,
  FiAlertCircle,
} from 'react-icons/fi';

import { API_URL } from '../config/api';


const formatCurrency = (amount = 0) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);

const Budget = () => {
  const [month, setMonth] = useState('');
  const [amount, setAmount] = useState('');
  const [fetchedBudget, setFetchedBudget] = useState(null);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingBudget, setFetchingBudget] = useState(false);
  const [messageType, setMessageType] = useState('');

  const token = localStorage.getItem('token');

  // ---------------------------------------------------------
  // Initial Month
  // ---------------------------------------------------------

  useEffect(() => {
    const now = new Date();

    const defaultMonth = now.toISOString().slice(0, 7);

    setMonth(defaultMonth);
    fetchBudget(defaultMonth);
  }, []);

  // ---------------------------------------------------------
  // Fetch Budget
  // ---------------------------------------------------------

  const fetchBudget = async (selectedMonth) => {
    if (!selectedMonth) return;

    setFetchingBudget(true);

    try {
      const res = await axios.get(
        `${API_URL}/budget/${selectedMonth}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFetchedBudget(res.data);
      setMessage('Budget fetched successfully');
      setMessageType('success');
    } catch (err) {
      console.error(err);

      setMessage('No budget found for this month');
      setMessageType('info');
      setFetchedBudget(null);
    } finally {
      setFetchingBudget(false);
    }
  };

  // ---------------------------------------------------------
  // Set Budget
  // ---------------------------------------------------------

  const handleSetBudget = async () => {
    if (!month || !amount || Number(amount) <= 0) {
      setMessage('Please enter a valid month and budget amount.');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post(
        `${API_URL}/budget/set`,
        {
          month,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message);
      setMessageType('success');

      await fetchBudget(month);

      setAmount('');
    } catch (err) {
      console.error(
        'Set budget error:',
        err.response?.data || err.message
      );

      setMessage('Error setting budget');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------
  // Refresh
  // ---------------------------------------------------------

  const handleFetchBudget = () => {
    fetchBudget(month);
  };

  // ---------------------------------------------------------
  // Budget Calculations
  // ---------------------------------------------------------

  const budgetStats = useMemo(() => {
    if (!fetchedBudget) {
      return {
        percentage: 0,
        remaining: 0,
        spent: 0,
        amount: 0,
        isOverBudget: false,
      };
    }

    const budgetAmount = Number(fetchedBudget.amount) || 0;
    const spentAmount = Number(fetchedBudget.spent) || 0;

    const percentage =
      budgetAmount > 0
        ? Math.min((spentAmount / budgetAmount) * 100, 100)
        : 0;

    const actualPercentage =
      budgetAmount > 0
        ? (spentAmount / budgetAmount) * 100
        : 0;

    return {
      percentage,
      actualPercentage,
      remaining: Number(fetchedBudget.remaining) || 0,
      spent: spentAmount,
      amount: budgetAmount,
      isOverBudget:
        actualPercentage > 100 ||
        Number(fetchedBudget.remaining) < 0,
    };
  }, [fetchedBudget]);

  const currentMonthLabel = useMemo(() => {
    if (!month) return 'Current month';

    const date = new Date(`${month}-01T00:00:00`);

    return date.toLocaleDateString('en-IN', {
      month: 'long',
      year: 'numeric',
    });
  }, [month]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        ease: 'easeOut',
      }}
      className="w-full"
    >
      {/* =====================================================
          Header
      ====================================================== */}

      <div className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FiTarget size={20} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-black text-slate-900">
                Monthly Budget
              </h3>

              {fetchedBudget && (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-600">
                  <FiCheckCircle size={11} />
                  Active
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Set a monthly spending limit and track your progress.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="group inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
        >
          <FiEdit3
            size={15}
            className="transition-transform duration-200 group-hover:scale-110"
          />

          {showForm ? 'Close' : 'Add / Update Budget'}

          <FiChevronDown
            size={14}
            className={`transition-transform duration-300 ${showForm ? 'rotate-180' : ''
              }`}
          />
        </button>
      </div>

      {/* =====================================================
          Budget Form
      ====================================================== */}

      <AnimatePresence initial={false}>
        {showForm && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-5 sm:px-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-4">
                  <p className="text-sm font-black text-slate-900">
                    Budget settings
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Choose a month and define how much you want to spend.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {/* Month */}
                  <div>
                    <label
                      htmlFor="budget-month"
                      className="mb-2 block text-xs font-bold text-slate-600"
                    >
                      Budget month
                    </label>

                    <div className="relative">
                      <FiCalendar
                        size={16}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="budget-month"
                        type="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                      />
                    </div>
                  </div>

                  {/* Amount */}
                  <div>
                    <label
                      htmlFor="budget-amount"
                      className="mb-2 block text-xs font-bold text-slate-600"
                    >
                      Budget amount
                    </label>

                    <div className="relative">
                      <FiDollarSign
                        size={16}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="budget-amount"
                        type="number"
                        min="1"
                        step="0.01"
                        value={amount}
                        onChange={(e) =>
                          setAmount(e.target.value)
                        }
                        placeholder="e.g. 25000"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleSetBudget}
                    disabled={loading}
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-5 text-sm font-bold text-blue-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiCheckCircle size={16} />
                        Set Budget
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleFetchBudget}
                    disabled={fetchingBudget || !month}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-600 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FiRefreshCw
                      size={16}
                      className={
                        fetchingBudget
                          ? 'animate-spin'
                          : ''
                      }
                    />
                    Refresh
                  </button>
                </div>

                {/* Message */}
                <AnimatePresence mode="wait">
                  {message && (
                    <motion.div
                      key={message}
                      initial={{
                        opacity: 0,
                        y: -5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -5,
                      }}
                      className={`mt-4 flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold ${messageType === 'success'
                        ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                        : messageType === 'error'
                          ? 'border-rose-100 bg-rose-50 text-rose-700'
                          : 'border-blue-100 bg-blue-50 text-blue-700'
                        }`}
                    >
                      {messageType === 'success' ? (
                        <FiCheckCircle size={14} />
                      ) : messageType === 'error' ? (
                        <FiAlertCircle size={14} />
                      ) : (
                        <FiRefreshCw size={14} />
                      )}

                      {message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          Budget Details
      ====================================================== */}

      <div className="border-t border-slate-100 p-5 sm:p-6">
        {fetchingBudget && !fetchedBudget ? (
          <div className="animate-pulse">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="h-4 w-32 rounded bg-slate-100" />
                <div className="mt-2 h-3 w-24 rounded bg-slate-100" />
              </div>

              <div className="h-8 w-24 rounded-lg bg-slate-100" />
            </div>

            <div className="h-3 w-full rounded-full bg-slate-100" />

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="h-20 rounded-xl bg-slate-100" />
              <div className="h-20 rounded-xl bg-slate-100" />
              <div className="h-20 rounded-xl bg-slate-100" />
            </div>
          </div>
        ) : fetchedBudget ? (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.35,
            }}
          >
            {/* Budget top */}
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <FiCalendar
                    size={15}
                    className="text-slate-400"
                  />

                  <p className="text-sm font-black text-slate-900">
                    {currentMonthLabel}
                  </p>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  Monthly spending target
                </p>
              </div>

              <div
                className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black ${budgetStats.isOverBudget
                  ? 'bg-rose-50 text-rose-600'
                  : budgetStats.percentage >= 80
                    ? 'bg-amber-50 text-amber-600'
                    : 'bg-emerald-50 text-emerald-600'
                  }`}
              >
                {budgetStats.isOverBudget ? (
                  <>
                    <FiAlertCircle size={13} />
                    Over budget
                  </>
                ) : budgetStats.percentage >= 80 ? (
                  <>
                    <FiTrendingDown size={13} />
                    Near limit
                  </>
                ) : (
                  <>
                    <FiCheckCircle size={13} />
                    On track
                  </>
                )}
              </div>
            </div>

            {/* Progress */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  Spending progress
                </span>

                <span className="text-xs font-black text-slate-700">
                  {Math.round(budgetStats.actualPercentage || 0)}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${budgetStats.percentage}%`,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeOut',
                  }}
                  className={`h-full rounded-full ${budgetStats.isOverBudget
                    ? 'bg-gradient-to-r from-rose-400 to-rose-600'
                    : budgetStats.percentage >= 80
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                      : 'bg-gradient-to-r from-blue-500 to-violet-500'
                    }`}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {/* Budget */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                  <FiTarget size={15} />
                </div>

                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  Budget
                </p>

                <p className="mt-1 text-lg font-black text-slate-900">
                  {formatCurrency(budgetStats.amount)}
                </p>
              </div>

              {/* Spent */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-rose-500 shadow-sm">
                  <FiTrendingDown size={15} />
                </div>

                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  Spent
                </p>

                <p className="mt-1 text-lg font-black text-slate-900">
                  {formatCurrency(budgetStats.spent)}
                </p>
              </div>

              {/* Remaining */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div
                  className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm ${budgetStats.isOverBudget
                    ? 'text-rose-500'
                    : 'text-emerald-600'
                    }`}
                >
                  {budgetStats.isOverBudget ? (
                    <FiAlertCircle size={15} />
                  ) : (
                    <FiDollarSign size={15} />
                  )}
                </div>

                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  Remaining
                </p>

                <p
                  className={`mt-1 text-lg font-black ${budgetStats.isOverBudget
                    ? 'text-rose-600'
                    : 'text-emerald-600'
                    }`}
                >
                  {formatCurrency(budgetStats.remaining)}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* =====================================================
             Empty State
          ====================================================== */

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
              <FiTarget size={22} />
            </div>

            <h4 className="mt-3 text-sm font-black text-slate-800">
              No budget set
            </h4>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">
              Set a monthly budget to track your spending and understand how
              much you have left.
            </p>

            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-xs font-bold text-blue-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              <FiEdit3 size={14} />
              Set Monthly Budget
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Budget;
