import React from 'react';
import { Link } from 'react-router-dom';
import {
    FiArrowUpRight,
    FiBarChart2,
    FiHeart,
    FiMail,
    FiShield,
    FiTrendingUp,
} from 'react-icons/fi';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-200 bg-white">
            {/* =========================================================
                MAIN FOOTER
            ========================================================= */}
            <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
                    {/* =================================================
                        BRAND
                    ================================================= */}
                    <div className="max-w-sm">
                        <Link
                            to="/"
                            className="group inline-flex items-center gap-3"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-lg font-bold text-white shadow-lg shadow-blue-600/20 transition-transform duration-200 group-hover:scale-105">
                                ₹
                            </div>

                            <div className="leading-none">
                                <div className="text-xl font-black tracking-[-0.04em] text-slate-950">
                                    Fin<span className="text-blue-600">Track</span>
                                </div>

                                <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                                    Smart money management
                                </div>
                            </div>
                        </Link>

                        <p className="mt-6 text-sm leading-6 text-slate-500">
                            A smarter way to track spending, manage budgets,
                            understand your financial habits, and make better
                            money decisions.
                        </p>

                        {/* Trust indicators */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
                                <FiShield className="text-emerald-500" size={14} />
                                Secure workspace
                            </div>

                            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
                                <FiTrendingUp className="text-blue-500" size={14} />
                                Smart insights
                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        PRODUCT
                    ================================================= */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-950">
                            Product
                        </h3>

                        <ul className="mt-5 space-y-3">
                            <li>
                                <Link
                                    to="/"
                                    className="text-sm text-slate-500 transition-colors hover:text-blue-600"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/about"
                                    className="text-sm text-slate-500 transition-colors hover:text-blue-600"
                                >
                                    About FinTrack
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/ai-budget"
                                    className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-blue-600"
                                >
                                    AI Budget Planner
                                    <FiArrowUpRight size={13} />
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/dashboard"
                                    className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-blue-600"
                                >
                                    Dashboard
                                    <FiBarChart2 size={13} />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* =================================================
                        ACCOUNT
                    ================================================= */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-950">
                            Account
                        </h3>

                        <ul className="mt-5 space-y-3">
                            <li>
                                <Link
                                    to="/login"
                                    className="text-sm text-slate-500 transition-colors hover:text-blue-600"
                                >
                                    Login
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/register"
                                    className="text-sm text-slate-500 transition-colors hover:text-blue-600"
                                >
                                    Create an account
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/register"
                                    className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-blue-600"
                                >
                                    Get started
                                    <FiArrowUpRight size={13} />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* =================================================
                        CONTACT / CTA
                    ================================================= */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-950">
                            Stay on top of your money
                        </h3>

                        <p className="mt-5 text-sm leading-6 text-slate-500">
                            Start building better financial habits with
                            intelligent tools designed for everyday money
                            management.
                        </p>

                        <Link
                            to="/register"
                            className="group mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                            Start for free

                            <FiArrowUpRight
                                size={15}
                                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </Link>

                        <a
                            href="mailto:support@fintrack.com"
                            className="mt-5 flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-blue-600"
                        >
                            <FiMail size={15} />
                            support@fintrack.com
                        </a>
                    </div>
                </div>
            </div>

            {/* =========================================================
                BOTTOM BAR
            ========================================================= */}
            <div className="border-t border-slate-100 bg-slate-50/70">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-5 sm:px-6 md:flex-row lg:px-8">
                    <p className="text-center text-xs font-medium text-slate-400 md:text-left">
                        © {currentYear} FinTrack. All rights reserved.
                    </p>

                    <div className="flex items-center gap-5">
                        <span className="text-xs font-medium text-slate-400">
                            Built for smarter financial decisions
                        </span>

                        <span className="hidden h-4 w-px bg-slate-200 sm:block" />

                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                            Made with
                            <FiHeart
                                size={12}
                                className="fill-current text-rose-400"
                            />
                            for better money management
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;