import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiCalendar,
    FiCheckCircle,
    FiClock,
    FiDownload,
    FiFileText,
    FiMail,
    FiSend,
} from 'react-icons/fi';

import { API_URL } from '../config/api';

const GenerateReport = () => {
    const [format, setFormat] = useState('pdf');
    const [email, setEmail] = useState('');
    const [range, setRange] = useState('weekly');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);

    // Automatically calculate dates when range changes (unless 'custom')
    useEffect(() => {
        const today = new Date();
        let start;
        const end = today.toISOString().split('T')[0];

        if (range === 'weekly') {
            start = new Date(today);
            start.setDate(start.getDate() - 7);
        } else if (range === 'monthly') {
            start = new Date(today);
            start.setMonth(start.getMonth() - 1);
        } else if (range === 'yearly') {
            start = new Date(today);
            start.setFullYear(start.getFullYear() - 1);
        }

        if (range !== 'custom') {
            setStartDate(start.toISOString().split('T')[0]);
            setEndDate(end);
        }
    }, [range]);

    const handleGenerateAndSend = async () => {
        if (!email || !startDate || !endDate) {
            alert('Please fill in all fields');
            return;
        }

        const token = localStorage.getItem('token');

        if (!token) {
            alert('User not authenticated. Please log in again.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `${API_URL}/api/transaction-report`,
                {
                    range,
                    format,
                    startDate,
                    endDate,
                    sendTo: email,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(response.data.message || 'Report sent successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to send report.');
        } finally {
            setLoading(false);
        }
    };

    const rangeLabel = {
        weekly: 'Last 7 Days',
        monthly: 'Last 1 Month',
        yearly: 'Last 1 Year',
        custom: 'Custom Range',
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-6 w-full"
        >
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* Header */}
                <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-blue-50/40 px-5 py-5 sm:px-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
                                <FiFileText size={20} />
                            </div>

                            <div>
                                <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                                    Generate & Email Report
                                </h2>
                                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                                    Create a transaction report and send it directly to your email.
                                </p>
                            </div>
                        </div>

                        <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:flex">
                            <FiCheckCircle size={14} />
                            Secure & Private
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="p-5 sm:p-6">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {/* Format */}
                        <div>
                            <label
                                htmlFor="report-format"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Report Format
                            </label>

                            <div className="relative">
                                <FiDownload
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={17}
                                />

                                <select
                                    id="report-format"
                                    value={format}
                                    onChange={(e) => setFormat(e.target.value)}
                                    className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm font-medium text-slate-800 outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                                >
                                    <option value="pdf">PDF</option>
                                    <option value="csv">CSV</option>
                                </select>

                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                                    ▼
                                </span>
                            </div>
                        </div>

                        {/* Date Range */}
                        <div>
                            <label
                                htmlFor="report-range"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Date Range
                            </label>

                            <div className="relative">
                                <FiClock
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={17}
                                />

                                <select
                                    id="report-range"
                                    value={range}
                                    onChange={(e) => setRange(e.target.value)}
                                    className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm font-medium text-slate-800 outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                                >
                                    <option value="weekly">Last 7 Days</option>
                                    <option value="monthly">Last 1 Month</option>
                                    <option value="yearly">Last 1 Year</option>
                                    <option value="custom">Custom</option>
                                </select>

                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                                    ▼
                                </span>
                            </div>

                            {range !== 'custom' && (
                                <p className="mt-1.5 text-xs text-slate-400">
                                    {rangeLabel[range]}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className={range === 'custom' ? 'md:col-span-2' : ''}>
                            <label
                                htmlFor="report-email"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Send To
                            </label>

                            <div className="relative">
                                <FiMail
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={17}
                                />

                                <input
                                    type="email"
                                    id="report-email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="example@mail.com"
                                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                                />
                            </div>
                        </div>

                        {/* Custom dates */}
                        <AnimatePresence>
                            {range === 'custom' && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <label
                                            htmlFor="report-start-date"
                                            className="mb-2 block text-sm font-semibold text-slate-700"
                                        >
                                            Start Date
                                        </label>

                                        <div className="relative">
                                            <FiCalendar
                                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                                size={17}
                                            />

                                            <input
                                                type="date"
                                                id="report-start-date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-slate-800 outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                                            />
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <label
                                            htmlFor="report-end-date"
                                            className="mb-2 block text-sm font-semibold text-slate-700"
                                        >
                                            End Date
                                        </label>

                                        <div className="relative">
                                            <FiCalendar
                                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                                size={17}
                                            />

                                            <input
                                                type="date"
                                                id="report-end-date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-slate-800 outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                                            />
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Selected report summary */}
                    <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 text-blue-500">
                                    <FiFileText size={18} />
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-slate-800">
                                        Report Summary
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        {format.toUpperCase()} report • {rangeLabel[range]}
                                        {startDate && endDate
                                            ? ` • ${startDate} → ${endDate}`
                                            : ''}
                                    </p>
                                </div>
                            </div>

                            {email && (
                                <div className="flex max-w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
                                    <FiMail className="shrink-0 text-slate-400" size={14} />
                                    <span className="truncate">{email}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action */}
                    <div className="mt-5 flex justify-stretch sm:justify-end">
                        <motion.button
                            type="button"
                            onClick={handleGenerateAndSend}
                            disabled={loading}
                            whileHover={!loading ? { y: -1 } : {}}
                            whileTap={!loading ? { scale: 0.98 } : {}}
                            className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            {loading ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-500" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <FiSend
                                        size={17}
                                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                                    />
                                    Generate & Send
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default GenerateReport;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const GenerateReport = () => {
//     const [format, setFormat] = useState('pdf');
//     const [email, setEmail] = useState('');
//     const [range, setRange] = useState('weekly');
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [loading, setLoading] = useState(false);

//     // Automatically calculate dates when range changes (unless 'custom')
//     useEffect(() => {
//         const today = new Date();
//         let start, end = today.toISOString().split('T')[0];

//         if (range === 'weekly') {
//             start = new Date(today.setDate(today.getDate() - 7));
//         } else if (range === 'monthly') {
//             start = new Date(today.setMonth(today.getMonth() - 1));
//         } else if (range === 'yearly') {
//             start = new Date(today.setFullYear(today.getFullYear() - 1));
//         }

//         if (range !== 'custom') {
//             setStartDate(start.toISOString().split('T')[0]);
//             setEndDate(end);
//         }
//     }, [range]);

//     const handleGenerateAndSend = async () => {
//         if (!email || !startDate || !endDate) {
//             alert('Please fill in all fields');
//             return;
//         }

//         const token = localStorage.getItem('token');

//         if (!token) {
//             alert('User not authenticated. Please log in again.');
//             return;
//         }

//         setLoading(true);
//         try {
//             const response = await axios.post(
//                 'http://localhost:3000/api/transaction-report',
//                 { range, format, startDate, endDate, sendTo: email },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );
//             alert(response.data.message || 'Report sent successfully!');
//         } catch (err) {
//             console.error(err);
//             alert('Failed to send report.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="card shadow p-4 mt-4">
//             <h5>Generate & Email Report</h5>
//             <div className="row mb-3">
//                 <div className="col-md-3">
//                     <label>Format</label>
//                     <select className="form-select" value={format} onChange={(e) => setFormat(e.target.value)}>
//                         <option value="pdf">PDF</option>
//                         <option value="csv">CSV</option>
//                     </select>
//                 </div>

//                 <div className="col-md-3">
//                     <label>Date Range</label>
//                     <select className="form-select" value={range} onChange={(e) => setRange(e.target.value)}>
//                         <option value="weekly">Last 7 Days</option>
//                         <option value="monthly">Last 1 Month</option>
//                         <option value="yearly">Last 1 Year</option>
//                         <option value="custom">Custom</option>
//                     </select>
//                 </div>

//                 {range === 'custom' && (
//                     <>
//                         <div className="col-md-3">
//                             <label>Start Date</label>
//                             <input
//                                 type="date"
//                                 className="form-control"
//                                 value={startDate}
//                                 onChange={(e) => setStartDate(e.target.value)}
//                             />
//                         </div>
//                         <div className="col-md-3">
//                             <label>End Date</label>
//                             <input
//                                 type="date"
//                                 className="form-control"
//                                 value={endDate}
//                                 onChange={(e) => setEndDate(e.target.value)}
//                             />
//                         </div>
//                     </>
//                 )}

//                 <div className="col-md-3 mt-2 mt-md-0">
//                     <label>Email</label>
//                     <input
//                         type="email"
//                         className="form-control"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="example@mail.com"
//                     />
//                 </div>
//             </div>

//             <div className="text-end">
//                 <button className="btn btn-success" onClick={handleGenerateAndSend} disabled={loading}>
//                     {loading ? 'Sending...' : 'Generate and Send'}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default GenerateReport;
