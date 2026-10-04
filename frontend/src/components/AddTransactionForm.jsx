import React, { useRef, useState } from 'react';
import axios from 'axios';
import Tesseract from 'tesseract.js';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiActivity,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiMic,
  FiRepeat,
  FiTag,
  FiUpload,
  FiDollarSign,
  FiRefreshCw,
  FiShield,
  FiX,
  FiZap,
} from 'react-icons/fi';
import { API_URL } from '../config/api';

const initialTransaction = {
  amount: '',
  category: '',
  note: '',
  type: 'income',
  date: '',
  isRecurring: false,
  frequency: '',
  endDate: '',
};

const AddTransactionForm = ({ fetchTransactions }) => {
  const [mode, setMode] = useState('manual');

  const [newTransaction, setNewTransaction] =
    useState(initialTransaction);

  const [ocrImage, setOcrImage] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [ocrLoading, setOcrLoading] = useState(false);

  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setNewTransaction((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetTransaction = () => {
    setNewTransaction(initialTransaction);
  };

  const handleAddTransaction = async (e) => {
    if (e?.preventDefault) {
      e.preventDefault();
    }

    const token = localStorage.getItem('token');

    try {
      await axios.post(
        `${API_URL}/addnewtransaction`,
        newTransaction,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTransactions();
      resetTransaction();

      setOcrImage(null);
      setOcrText('');

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleOcrImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setOcrImage(null);
      return;
    }

    setOcrImage(file);
    setOcrText('');
  };

  const formatDate = (rawDate) => {
    if (!rawDate) return '';

    const parts = rawDate.split(/[\/\-]/);

    if (parts.length !== 3) return '';

    if (parts[2].length === 2) {
      parts[2] = `20${parts[2]}`;
    }

    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(
      2,
      '0'
    )}`;
  };

  const handleOcrScan = () => {
    if (!ocrImage) return;

    setOcrLoading(true);

    Tesseract.recognize(ocrImage, 'eng', {
      logger: (message) => {
        console.log(message);
      },
    })
      .then(async ({ data: { text } }) => {
        setOcrText(text);

        try {
          const response = await axios.post(
            `${API_URL}/extract`,
            { text }
          );

          const extracted = response.data;

          const formattedDate = extracted.date
            ? formatDate(extracted.date)
            : '';

          setNewTransaction((prev) => ({
            ...prev,
            ...extracted,
            date: formattedDate,
            type: 'expense',
          }));
        } catch (error) {
          console.error(
            'Error sending OCR text to backend:',
            error
          );
        }

        setOcrLoading(false);
      })
      .catch((error) => {
        console.error('Tesseract error:', error);
        setOcrLoading(false);
      });
  };

  const handleStartListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        'Speech Recognition is not supported in your browser.'
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onresult = async (event) => {
      const speechText =
        event.results[0][0].transcript;

      console.log('🎙️ Speech recognized:', speechText);

      try {
        const response = await axios.post(
          `${API_URL}/extract`,
          { text: speechText }
        );

        const extracted = response.data;

        const formattedDate = extracted.date
          ? formatDate(extracted.date)
          : '';

        setNewTransaction((prev) => ({
          ...prev,
          ...extracted,
          date: formattedDate,
        }));
      } catch (error) {
        console.error(
          'Speech to transaction error:',
          error
        );
      }

      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error(
        'Speech recognition error:',
        event.error
      );

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setIsListening(false);
  };

  const switchMode = (nextMode) => {
    if (isListening) {
      stopListening();
    }

    setMode(nextMode);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      {/* Header */}
      <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-700 ring-1 ring-slate-200">
              <FiActivity size={20} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Add Transaction
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Record your income and expenses manually or let AI
                extract them for you.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
            <FiShield size={13} className="text-slate-500" />

            <span className="text-xs font-semibold text-slate-500">
              Secure entry
            </span>
          </div>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => switchMode('manual')}
            className={`group flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${mode === 'manual'
              ? 'border-slate-300 bg-white shadow-sm'
              : 'border-transparent bg-transparent hover:border-slate-200 hover:bg-white'
              }`}
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${mode === 'manual'
                ? 'bg-slate-100 text-slate-700'
                : 'bg-white text-slate-400 ring-1 ring-slate-200'
                }`}
            >
              <FiFileText size={17} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-800">
                Manual Entry
              </p>
              <p className="text-xs text-slate-500">
                Enter transaction details yourself
              </p>
            </div>

            {mode === 'manual' && (
              <FiCheckCircle
                size={17}
                className="ml-auto text-slate-600"
              />
            )}
          </button>

          <button
            type="button"
            onClick={() => switchMode('ocr')}
            className={`group flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${mode === 'ocr'
              ? 'border-slate-300 bg-white shadow-sm'
              : 'border-transparent bg-transparent hover:border-slate-200 hover:bg-white'
              }`}
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${mode === 'ocr'
                ? 'bg-slate-100 text-slate-700'
                : 'bg-white text-slate-400 ring-1 ring-slate-200'
                }`}
            >
              <FiZap size={17} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-800">
                Scan With AI
              </p>
              <p className="text-xs text-slate-500">
                Scan a receipt and autofill details
              </p>
            </div>

            {mode === 'ocr' && (
              <FiCheckCircle
                size={17}
                className="ml-auto text-slate-600"
              />
            )}
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <AnimatePresence mode="wait">
          {mode === 'manual' ? (
            <motion.div
              key="manual"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-5">
                <h3 className="text-lg font-bold text-slate-900">
                  Add Transaction Manually
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Enter the details of your transaction below.
                </p>
              </div>

              <form onSubmit={handleAddTransaction}>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Amount */}
                  <div>
                    <label
                      htmlFor="transaction-amount"
                      className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500"
                    >
                      <FiDollarSign size={13} />
                      Amount
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                        ₹
                      </span>

                      <input
                        id="transaction-amount"
                        type="number"
                        min="0"
                        step="0.01"
                        name="amount"
                        value={newTransaction.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        required
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm font-semibold text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                      />
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

                    <input
                      id="transaction-category"
                      type="text"
                      name="category"
                      value={newTransaction.category}
                      onChange={handleChange}
                      placeholder="e.g. Groceries, Salary"
                      required
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  {/* Note */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="transaction-note"
                      className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500"
                    >
                      <FiFileText size={13} />
                      Note
                    </label>

                    <textarea
                      id="transaction-note"
                      name="note"
                      value={newTransaction.note}
                      onChange={handleChange}
                      placeholder="Add a short note about this transaction..."
                      rows={3}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <label
                      htmlFor="transaction-type"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500"
                    >
                      Transaction Type
                    </label>

                    <div className="relative">
                      <select
                        id="transaction-type"
                        name="type"
                        value={newTransaction.type}
                        onChange={handleChange}
                        className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 pr-9 text-sm font-semibold text-slate-700 outline-none transition-all duration-200 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                      >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </select>

                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg
                          width="15"
                          height="15"
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

                  {/* Date */}
                  <div>
                    <label
                      htmlFor="transaction-date"
                      className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500"
                    >
                      <FiCalendar size={13} />
                      Date
                    </label>

                    <input
                      id="transaction-date"
                      type="date"
                      name="date"
                      value={newTransaction.date}
                      onChange={handleChange}
                      required
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 outline-none transition-all duration-200 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                    />
                  </div>
                </div>

                {/* Recurring Transaction */}
                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <label
                    htmlFor="isRecurring"
                    className="flex cursor-pointer items-start gap-3"
                  >
                    <input
                      type="checkbox"
                      id="isRecurring"
                      name="isRecurring"
                      checked={newTransaction.isRecurring}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 cursor-pointer rounded border-slate-300 accent-slate-700"
                    />

                    <span>
                      <span className="flex items-center gap-2 text-sm font-bold text-slate-800">
                        <FiRepeat size={15} />
                        Recurring Transaction
                      </span>

                      <span className="mt-1 block text-xs text-slate-500">
                        Setup a schedule for this transaction to repeat
                        automatically.
                      </span>
                    </span>
                  </label>

                  <AnimatePresence>
                    {newTransaction.isRecurring && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                          marginTop: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: 'auto',
                          marginTop: 18,
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          marginTop: 0,
                        }}
                        transition={{ duration: 0.25 }}
                        className="grid grid-cols-1 gap-4 overflow-hidden sm:grid-cols-2"
                      >
                        {/* Frequency */}
                        <div>
                          <label
                            htmlFor="frequency"
                            className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500"
                          >
                            <FiRepeat size={13} />
                            Frequency
                          </label>

                          <div className="relative">
                            <select
                              id="frequency"
                              name="frequency"
                              value={newTransaction.frequency}
                              onChange={handleChange}
                              required
                              className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-9 text-sm font-medium text-slate-700 outline-none transition-all duration-200 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                            >
                              <option value="">
                                Select Frequency
                              </option>
                              <option value="daily">Daily</option>
                              <option value="weekly">Weekly</option>
                              <option value="monthly">Monthly</option>
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

                        {/* End Date */}
                        <div>
                          <label
                            htmlFor="endDate"
                            className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500"
                          >
                            <FiCalendar size={13} />
                            End Date
                            <span className="normal-case tracking-normal text-slate-400">
                              Optional
                            </span>
                          </label>

                          <input
                            id="endDate"
                            type="date"
                            name="endDate"
                            value={newTransaction.endDate}
                            onChange={handleChange}
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition-all duration-200 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
                >
                  <FiCheckCircle
                    size={17}
                    className="transition-transform duration-200 group-hover:scale-110"
                  />
                  Add Transaction
                </motion.button>
              </form>

              {/* Speech Input */}
              <div className="mt-4 border-t border-slate-100 pt-4">
                <motion.button
                  type="button"
                  onClick={
                    isListening
                      ? stopListening
                      : handleStartListening
                  }
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border px-5 text-sm font-bold shadow-sm transition-all duration-200 ${isListening
                    ? 'border-slate-300 bg-slate-50 text-slate-800'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                >
                  {isListening ? (
                    <>
                      <span className="flex h-2.5 w-2.5 animate-pulse rounded-full bg-slate-500" />
                      Listening...
                      <FiX size={15} />
                    </>
                  ) : (
                    <>
                      <FiMic
                        size={17}
                        className="transition-transform duration-200 group-hover:scale-110"
                      />
                      Speak Transaction
                    </>
                  )}
                </motion.button>

                <p className="mt-2 text-center text-[11px] text-slate-400">
                  Speak naturally and FinTrack will send the text to
                  the transaction extraction service.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ocr"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              {/* OCR Header */}
              <div className="mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-700 ring-1 ring-slate-200">
                    <FiZap size={18} />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Scan Receipt With AI
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Upload a receipt image and automatically extract
                      transaction details.
                    </p>
                  </div>
                </div>
              </div>

              {/* Upload Area */}
              <label
                htmlFor="ocr-image"
                className={`group relative flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-200 ${ocrImage
                  ? 'border-slate-300 bg-slate-50'
                  : 'border-slate-200 bg-slate-50/60 hover:border-slate-300 hover:bg-slate-50'
                  }`}
              >
                <input
                  ref={fileInputRef}
                  id="ocr-image"
                  type="file"
                  accept="image/*"
                  onChange={handleOcrImageChange}
                  className="hidden"
                />

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-200 transition-transform duration-200 group-hover:-translate-y-1">
                  <FiUpload size={23} />
                </div>

                {ocrImage ? (
                  <>
                    <p className="max-w-full truncate px-4 text-sm font-bold text-slate-800">
                      {ocrImage.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Click to choose a different image
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-bold text-slate-800">
                      Upload receipt image
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      PNG, JPG or other supported image formats
                    </p>
                  </>
                )}
              </label>

              {/* Scan Button */}
              <motion.button
                type="button"
                onClick={handleOcrScan}
                disabled={ocrLoading || !ocrImage}
                whileHover={
                  !ocrLoading && ocrImage ? { y: -2 } : {}
                }
                whileTap={
                  !ocrLoading && ocrImage ? { scale: 0.98 } : {}
                }
                className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {ocrLoading ? (
                  <>
                    <FiRefreshCw
                      size={17}
                      className="animate-spin"
                    />
                    Scanning Receipt...
                  </>
                ) : (
                  <>
                    <FiZap size={17} />
                    Scan & Autofill
                  </>
                )}
              </motion.button>

              {/* OCR Result */}
              <AnimatePresence>
                {ocrText && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FiFileText
                          size={15}
                          className="text-slate-500"
                        />

                        <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
                          Extracted Text
                        </span>
                      </div>

                      <FiCheckCircle
                        size={16}
                        className="text-slate-500"
                      />
                    </div>

                    <pre className="max-h-56 overflow-auto whitespace-pre-wrap p-4 text-left text-xs leading-6 text-slate-600">
                      {ocrText}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Add OCR Transaction */}
              <motion.button
                type="button"
                onClick={handleAddTransaction}
                disabled={!newTransaction.amount}
                whileHover={
                  newTransaction.amount ? { y: -2 } : {}
                }
                whileTap={
                  newTransaction.amount ? { scale: 0.98 } : {}
                }
                className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                <FiCheckCircle size={17} />
                Add Transaction from OCR
              </motion.button>

              {/* AI Info */}
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <FiZap
                  size={17}
                  className="mt-0.5 shrink-0 text-slate-500"
                />

                <div>
                  <p className="text-xs font-bold text-slate-700">
                    AI-assisted extraction
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Receipt text is processed through the existing
                    extraction service and used to autofill your
                    transaction form.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AddTransactionForm;
