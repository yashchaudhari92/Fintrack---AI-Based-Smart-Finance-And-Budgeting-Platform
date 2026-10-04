import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiAlertCircle,
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiDollarSign,
  FiInfo,
  FiLoader,
  FiPieChart,
  FiRefreshCw,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from 'react-icons/fi';
import { API_URL } from '../config/api';


const BudgetAI = () => {
  const [income, setIncome] = useState('');
  const [fixedExpenses, setFixedExpenses] = useState('');
  const [variableExpenses, setVariableExpenses] = useState('');

  const [suggestion, setSuggestion] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuggestion(null);
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/ai-budget-suggestion`,
        {
          income,
          fixedExpenses,
          variableExpenses,
        }
      );

      setSuggestion(res.data);
    } catch (err) {
      console.error(
        'AI Budget Error:',
        err.response?.data || err.message
      );

      setError('Failed to fetch AI suggestion');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIncome('');
    setFixedExpenses('');
    setVariableExpenses('');
    setSuggestion(null);
    setError('');
  };

  const cleanAdvice = (advice) => {
    if (!advice) {
      return 'Try to reduce wants, increase savings!';
    }

    return advice
      .replace(/\*\*/g, '')
      .replace(/^\*\s*/gm, '• ')
      .trim();
  };

  const formatValue = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === ''
    ) {
      return 'Not available';
    }

    return value;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-5xl">
        {/* Page Header */}
        <div className="mb-7 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200"
          >
            <FiZap size={24} />
          </motion.div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            AI Financial Assistant
          </p>

          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            AI Budget Planner
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Tell FinTrack about your monthly income and expenses.
            Our AI will suggest how to divide your budget into
            <span className="font-semibold text-slate-700">
              {' '}
              needs, wants and savings.
            </span>
          </p>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Intro Banner */}
          <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-5 sm:px-7">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-200">
                <FiTarget size={18} />
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-800">
                  Build a smarter monthly plan
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Example: If your income is ₹50,000, FinTrack can
                  help you plan your spending and savings more
                  effectively.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-5 sm:p-7">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Monthly Income */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="monthly-income"
                    className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500"
                  >
                    <FiDollarSign size={13} />
                    Monthly Income
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                      ₹
                    </span>

                    <input
                      id="monthly-income"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Enter your monthly income"
                      value={income}
                      onChange={(e) =>
                        setIncome(e.target.value)
                      }
                      required
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm font-semibold text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                    />
                  </div>
                </div>

                {/* Fixed Expenses */}
                <div>
                  <label
                    htmlFor="fixed-expenses"
                    className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500"
                  >
                    <FiBarChart2 size={13} />
                    Fixed Expenses
                  </label>

                  <input
                    id="fixed-expenses"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Rent, bills, etc."
                    value={fixedExpenses}
                    onChange={(e) =>
                      setFixedExpenses(e.target.value)
                    }
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                  />

                  <p className="mt-2 text-[11px] text-slate-400">
                    Rent, utilities, subscriptions and other regular
                    commitments.
                  </p>
                </div>

                {/* Variable Expenses */}
                <div>
                  <label
                    htmlFor="variable-expenses"
                    className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500"
                  >
                    <FiPieChart size={13} />
                    Other Expenses
                  </label>

                  <input
                    id="variable-expenses"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Food, travel, etc."
                    value={variableExpenses}
                    onChange={(e) =>
                      setVariableExpenses(e.target.value)
                    }
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                  />

                  <p className="mt-2 text-[11px] text-slate-400">
                    Food, shopping, travel and other variable
                    spending.
                  </p>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { y: -2 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <FiLoader
                      size={17}
                      className="animate-spin"
                    />
                    Generating Your Plan...
                  </>
                ) : (
                  <>
                    <FiZap
                      size={17}
                      className="transition-transform duration-200 group-hover:scale-110"
                    />
                    Get AI Suggestion
                    <FiArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </>
                )}
              </motion.button>
            </form>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-4 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4"
                >
                  <FiAlertCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-rose-500"
                  />

                  <div>
                    <p className="text-sm font-bold text-rose-700">
                      Unable to generate your budget plan
                    </p>

                    <p className="mt-1 text-xs text-rose-600">
                      {error}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AI Result */}
            <AnimatePresence>
              {suggestion && (
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
                  }}
                  className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  {/* Result Header */}
                  <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-5 sm:px-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-200">
                          <FiCheckCircle size={18} />
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-slate-900">
                            Your AI-Generated Budget Plan
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            A personalized breakdown based on the
                            information you provided.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                      >
                        <FiRefreshCw size={13} />
                        Start Over
                      </button>
                    </div>
                  </div>

                  {/* Budget Cards */}
                  <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3 sm:p-6">
                    {/* Needs */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.08,
                      }}
                      className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-200">
                          <FiDollarSign size={18} />
                        </div>

                        <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-400 ring-1 ring-slate-200">
                          Needs
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-slate-500">
                        Essential spending
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-900">
                        {formatValue(
                          suggestion.budget?.Needs
                        )}
                      </p>
                    </motion.div>

                    {/* Wants */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.16,
                      }}
                      className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-200">
                          <FiPieChart size={18} />
                        </div>

                        <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-400 ring-1 ring-slate-200">
                          Wants
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-slate-500">
                        Lifestyle spending
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-900">
                        {formatValue(
                          suggestion.budget?.Wants
                        )}
                      </p>
                    </motion.div>

                    {/* Savings */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.24,
                      }}
                      className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-200">
                          <FiTrendingUp size={18} />
                        </div>

                        <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-400 ring-1 ring-slate-200">
                          Savings
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-slate-500">
                        Future financial goals
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-900">
                        {formatValue(
                          suggestion.budget?.Savings
                        )}
                      </p>
                    </motion.div>
                  </div>

                  {/* Advice */}
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm ring-1 ring-slate-200">
                          <FiInfo size={15} />
                        </div>

                        <h4 className="text-sm font-bold text-slate-800">
                          Simple Advice
                        </h4>
                      </div>

                      <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                        {cleanAdvice(suggestion.advice)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Information */}
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 ring-1 ring-slate-200">
            <FiInfo size={16} />
          </div>

          <div>
            <p className="text-xs font-bold text-slate-700">
              Budget planning made simple
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Provide realistic monthly figures for a more useful AI
              recommendation. The generated plan is based on the
              information submitted through this form.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BudgetAI;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { FaMoneyBillWave, FaChartPie, FaPiggyBank } from 'react-icons/fa';

// const BudgetAI = () => {
//     const [income, setIncome] = useState('');
//     const [fixedExpenses, setFixedExpenses] = useState('');
//     const [variableExpenses, setVariableExpenses] = useState('');
//     const [suggestion, setSuggestion] = useState(null);
//     const [error, setError] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuggestion(null);

//         try {
//             const res = await axios.post('http://localhost:3000/api/ai-budget-suggestion', {
//                 income,
//                 fixedExpenses,
//                 variableExpenses
//             });
//             setSuggestion(res.data);
//         } catch (err) {
//             console.error("AI Budget Error:", err.response?.data || err.message);
//             setError('Failed to fetch AI suggestion');
//         }
//     };

//     return (
//         <motion.div
//             className="container-fluid py-5 px-3 d-flex justify-content-center align-items-center min-vh-100"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//         >
//             <div className="bg-white p-4 p-md-5 rounded-4 shadow w-100" style={{ maxWidth: '720px' }}>
//                 <h3 className="text-center mb-4">💡 AI Budget Planner</h3>
//                 <p className="text-muted text-center">
//                     Enter your monthly income and expenses, and our AI will suggest how to divide your budget into
//                     <strong> Needs, Wants, and Savings</strong>.
//                     <br />
//                     <em>Example: If your income is ₹50,000, we'll guide you to spend wisely and save smartly.</em>
//                 </p>

//                 <form onSubmit={handleSubmit}>
//                     <div className="row g-3">
//                         <div className="col-12">
//                             <label className="form-label">Monthly Income (₹)</label>
//                             <input
//                                 type="number"
//                                 className="form-control"
//                                 placeholder="Enter your income"
//                                 value={income}
//                                 onChange={(e) => setIncome(e.target.value)}
//                                 required
//                             />
//                         </div>

//                         <div className="col-12 col-md-6">
//                             <label className="form-label">Fixed Expenses (₹)</label>
//                             <input
//                                 type="number"
//                                 className="form-control"
//                                 placeholder="Rent, bills, etc."
//                                 value={fixedExpenses}
//                                 onChange={(e) => setFixedExpenses(e.target.value)}
//                                 required
//                             />
//                         </div>

//                         <div className="col-12 col-md-6">
//                             <label className="form-label">Other Expenses (₹)</label>
//                             <input
//                                 type="number"
//                                 className="form-control"
//                                 placeholder="Food, travel, etc."
//                                 value={variableExpenses}
//                                 onChange={(e) => setVariableExpenses(e.target.value)}
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <div className="d-grid mt-4">
//                         <button type="submit" className="btn btn-primary btn-lg">
//                             🔍 Get AI Suggestion
//                         </button>
//                     </div>
//                 </form>

//                 {error && <div className="alert alert-danger mt-3">{error}</div>}

//                 {suggestion && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 0.5 }}
//                         className="alert mt-4 bg-light border shadow-sm"
//                     >
//                         <h5 className="mb-3 text-center">📊 Your AI-Generated Budget Plan</h5>
//                         <div className="row text-center">
//                             <div className="col-12 col-md-4 mb-3">
//                                 <FaMoneyBillWave className="text-success fs-3 mb-1" />
//                                 <div><strong>Needs:</strong> {suggestion.budget?.Needs}</div>
//                             </div>
//                             <div className="col-12 col-md-4 mb-3">
//                                 <FaChartPie className="text-warning fs-3 mb-1" />
//                                 <div><strong>Wants:</strong> {suggestion.budget?.Wants}</div>
//                             </div>
//                             <div className="col-12 col-md-4 mb-3">
//                                 <FaPiggyBank className="text-primary fs-3 mb-1" />
//                                 <div><strong>Savings:</strong> {suggestion.budget?.Savings}</div>
//                             </div>
//                         </div>
//                         <p className="text-start mt-3 text-dark" style={{ whiteSpace: 'pre-line' }}>
//                             <strong>💬 Simple Advice:</strong><br />
//                             {suggestion.advice
//                                 ?.replace(/\*\*/g, '')       // Remove bold stars
//                                 .replace(/^\*\s*/gm, '• ')   // Replace list * with bullet
//                                 || "Try to reduce wants, increase savings!"}
//                         </p>

//                     </motion.div>
//                 )}
//             </div>
//         </motion.div>
//     );

// };

// export default BudgetAI;
