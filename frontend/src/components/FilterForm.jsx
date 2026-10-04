import React from 'react';
import { motion } from 'framer-motion';
import {
  FiFilter,
  FiTag,
  FiCalendar,
  FiArrowDown,
  FiRefreshCw,
} from 'react-icons/fi';


const FilterForm = ({
  type,
  setType,
  category,
  setCategory,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleFilter,
}) => {
  const hasFilters = type || category || startDate || endDate;

  const handleReset = () => {
    setType('');
    setCategory('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 ring-1 ring-slate-200">
            <FiFilter size={18} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Filter Transactions
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Narrow down your transactions by type, category or date.
            </p>
          </div>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800"
          >
            <FiRefreshCw size={13} />
            Clear Filters
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {/* Transaction Type */}
          <div>
            <label
              htmlFor="transaction-type"
              className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              <FiArrowDown size={13} />
              Type
            </label>

            <div className="relative">
              <select
                id="transaction-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 pr-9 text-sm font-medium text-slate-700 outline-none transition-all duration-200 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
              >
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg
                  width="14"
                  height="14"
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

          {/* Category */}
          <div>
            <label
              htmlFor="transaction-category"
              className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              <FiTag size={13} />
              Category
            </label>

            <div className="relative">
              <select
                id="transaction-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 pr-9 text-sm font-medium text-slate-700 outline-none transition-all duration-200 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
              >
                <option value="">All Categories</option>
                <option value="Salary">Salary</option>
                <option value="Groceries">Groceries</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Bills">Bills</option>
                <option value="Shopping">Shopping</option>
                <option value="Travel">Travel</option>
              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg
                  width="14"
                  height="14"
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

          {/* Start Date */}
          <div>
            <label
              htmlFor="start-date"
              className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              <FiCalendar size={13} />
              From
            </label>

            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 outline-none transition-all duration-200 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
            />
          </div>

          {/* End Date */}
          <div>
            <label
              htmlFor="end-date"
              className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              <FiCalendar size={13} />
              To
            </label>

            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 outline-none transition-all duration-200 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
            />
          </div>

          {/* Apply Filter */}
          <div className="flex items-end">
            <motion.button
              type="button"
              onClick={handleFilter}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
            >
              <FiFilter
                size={16}
                className="transition-transform duration-200 group-hover:rotate-6"
              />
              Apply Filter
            </motion.button>
          </div>
        </div>

        {/* Active Filter Indicator */}
        {hasFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4"
          >
            <span className="text-xs font-semibold text-slate-400">
              Active:
            </span>

            {type && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-600">
                {type}
              </span>
            )}

            {category && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {category}
              </span>
            )}

            {startDate && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                From {startDate}
              </span>
            )}

            {endDate && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                To {endDate}
              </span>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FilterForm;



// import React from 'react';

// const FilterForm = ({ type, setType, category, setCategory, startDate, setStartDate, endDate, setEndDate, handleFilter }) => {
//   return (
//     <div className="card p-3 mb-4 shadow-sm">
//       <div className="row g-3">
//         <div className="col-md-3">
//           <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
//             <option value="">Select Type</option>
//             <option value="income">Income</option>
//             <option value="expense">Expense</option>
//           </select>
//         </div>
//         <div className="col-md-3">
//           <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
//             <option value="">Select Category</option>
//             <option value="Salary">Salary</option>
//             <option value="Groceries">Groceries</option>
//             <option value="Entertainment">Entertainment</option>
//             <option value="Bills">Bills</option>
//             <option value="Shopping">Shopping</option>
//             <option value="Travel">Travel</option>
//           </select>
//         </div>
//         <div className="col-md-2">
//           <input
//             type="date"
//             className="form-control"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />
//         </div>
//         <div className="col-md-2">
//           <input
//             type="date"
//             className="form-control"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//         </div>
//         <div className="col-md-2">
//           <button className="btn btn-primary w-100" onClick={handleFilter}>
//             Apply Filter
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterForm;
