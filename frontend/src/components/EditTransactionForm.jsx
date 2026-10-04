import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiCalendar,
  FiCheck,
  FiDollarSign,
  FiEdit3,
  FiFileText,
  FiTag,
  FiX,
} from 'react-icons/fi';

import { API_URL } from '../config/api';

const EditTransactionForm = ({ transaction, onSubmit, onCancel }) => {
  const [editFormData, setEditFormData] = useState({
    amount: '',
    category: '',
    note: '',
    type: '',
    date: '',
  });

  useEffect(() => {
    if (transaction) {
      setEditFormData({
        amount: transaction.amount ?? '',
        category: transaction.category ?? '',
        note: transaction.note ?? '',
        type: transaction.type ?? '',
        date: transaction.date ? transaction.date.slice(0, 10) : '',
      });
    }
  }, [transaction]);

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;

    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitEdit = () => {
    if (!transaction?._id) return;

    onSubmit(transaction._id, editFormData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-blue-50/50 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
              <FiEdit3 size={18} />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                Edit Transaction
              </h3>
              <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                Update the details of your transaction.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Amount */}
            <div>
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Amount
              </label>

              <div className="relative">
                <FiDollarSign
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={17}
                />

                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={editFormData.amount}
                  onChange={handleEditFormChange}
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Category
              </label>

              <div className="relative">
                <FiTag
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={17}
                />

                <input
                  type="text"
                  id="category"
                  name="category"
                  value={editFormData.category}
                  onChange={handleEditFormChange}
                  placeholder="e.g. Food, Salary, Travel"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            {/* Note */}
            <div className="md:col-span-2">
              <label
                htmlFor="note"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Note
              </label>

              <div className="relative">
                <FiFileText
                  className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                  size={17}
                />

                <input
                  type="text"
                  id="note"
                  name="note"
                  value={editFormData.note}
                  onChange={handleEditFormChange}
                  placeholder="Add a note about this transaction"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            {/* Transaction Type */}
            <div>
              <label
                htmlFor="type"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Transaction Type
              </label>

              <select
                id="type"
                name="type"
                value={editFormData.type}
                onChange={handleEditFormChange}
                className="h-11 w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="">Select Type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="date"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Date
              </label>

              <div className="relative">
                <FiCalendar
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={17}
                />

                <input
                  type="date"
                  id="date"
                  name="date"
                  value={editFormData.date}
                  onChange={handleEditFormChange}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-slate-800 outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <motion.button
              type="button"
              onClick={onCancel}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
            >
              <FiX
                size={17}
                className="transition-transform duration-200 group-hover:rotate-90"
              />
              Cancel
            </motion.button>

            <motion.button
              type="button"
              onClick={submitEdit}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 sm:w-auto"
            >
              <FiCheck
                size={17}
                className="transition-transform duration-200 group-hover:scale-110"
              />
              Save Changes
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EditTransactionForm;



// // src/components/EditTransactionForm.jsx
// import React, { useState, useEffect } from 'react';

// const EditTransactionForm = ({ transaction, onSubmit, onCancel }) => {
//   const [editFormData, setEditFormData] = useState({
//     amount: '',
//     category: '',
//     note: '',
//     type: '',
//     date: '',
//   });

//   useEffect(() => {
//     if (transaction) {
//       setEditFormData({
//         amount: transaction.amount,
//         category: transaction.category,
//         note: transaction.note,
//         type: transaction.type,
//         date: transaction.date.slice(0, 10),
//       });
//     }
//   }, [transaction]);

//   const handleEditFormChange = (e) => {
//     setEditFormData({
//       ...editFormData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const submitEdit = (err) => {
//     console.log(err);
//     onSubmit(transaction._id, editFormData);
//   };

//   return (
//     <div className="edit-form">
//       <div className="mb-3">
//         <label htmlFor="amount" className="form-label">Amount</label>
//         <input
//           type="number"
//           id="amount"
//           name="amount"
//           value={editFormData.amount}
//           onChange={handleEditFormChange}
//           className="form-control"
//           placeholder="Amount"
//         />
//       </div>
      
//       <div className="mb-3">
//         <label htmlFor="category" className="form-label">Category</label>
//         <input
//           type="text"
//           id="category"
//           name="category"
//           value={editFormData.category}
//           onChange={handleEditFormChange}
//           className="form-control"
//           placeholder="Category"
//         />
//       </div>

//       <div className="mb-3">
//         <label htmlFor="note" className="form-label">Note</label>
//         <input
//           type="text"
//           id="note"
//           name="note"
//           value={editFormData.note}
//           onChange={handleEditFormChange}
//           className="form-control"
//           placeholder="Note"
//         />
//       </div>

//       <div className="mb-3">
//         <label htmlFor="type" className="form-label">Transaction Type</label>
//         <select
//           id="type"
//           name="type"
//           value={editFormData.type}
//           onChange={handleEditFormChange}
//           className="form-control"
//         >
//           <option value="">Select Type</option>
//           <option value="income">Income</option>
//           <option value="expense">Expense</option>
//         </select>
//       </div>

//       <div className="mb-3">
//         <label htmlFor="date" className="form-label">Date</label>
//         <input
//           type="date"
//           id="date"
//           name="date"
//           value={editFormData.date}
//           onChange={handleEditFormChange}
//           className="form-control"
//         />
//       </div>

//       <button className="btn btn-success btn-sm me-2" onClick={submitEdit}>
//         Save
//       </button>
//       <button className="btn btn-secondary btn-sm" onClick={onCancel}>
//         Cancel
//       </button>
//     </div>
//   );
// };

// export default EditTransactionForm;
