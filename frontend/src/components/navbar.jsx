import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    FiArrowRight,
    FiBarChart2,
    FiChevronDown,
    FiLogOut,
    FiMenu,
    FiPieChart,
    FiUser,
    FiX,
    FiZap,
} from 'react-icons/fi';

import { API_URL } from '../config/api';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const isLoggedIn = !!localStorage.getItem('token');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 12);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsMobileMenuOpen(false);
        navigate('/');
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? 'border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl'
                        : 'border-b border-transparent bg-white/75 backdrop-blur-md'
                }`}
            >
                <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
                    {/* =====================================================
                        LOGO
                        ===================================================== */}
                    <Link
                        to="/"
                        className="group flex items-center gap-2.5"
                        aria-label="FinTrack Home"
                    >
                        <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 shadow-lg shadow-blue-600/20 transition-transform duration-200 group-hover:scale-105">
                            <div className="absolute inset-0 bg-white/10" />

                            <span className="relative text-lg text-white">
                                ₹
                            </span>
                        </div>

                        <div className="flex flex-col leading-none">
                            <span className="text-[18px] font-black tracking-[-0.03em] text-slate-950">
                                Fin<span className="text-blue-600">Track</span>
                            </span>

                            <span className="mt-1 hidden text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:block">
                                Smart money management
                            </span>
                        </div>
                    </Link>

                    {/* =====================================================
                        DESKTOP NAVIGATION
                        ===================================================== */}
                    {!isLoggedIn ? (
                        <div className="hidden items-center gap-1 lg:flex">
                            <Link
                                to="/"
                                className={`relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                                    isActive('/')
                                        ? 'text-blue-600'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                                }`}
                            >
                                Home

                                {isActive('/') && (
                                    <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-600" />
                                )}
                            </Link>

                            <Link
                                to="/about"
                                className={`relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                                    isActive('/about')
                                        ? 'text-blue-600'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                                }`}
                            >
                                About

                                {isActive('/about') && (
                                    <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-600" />
                                )}
                            </Link>

                            {/* Product hint */}
                            <div className="mx-2 h-5 w-px bg-slate-200" />

                            <Link
                                to="/login"
                                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-950"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
                            >
                                Get started

                                <FiArrowRight
                                    size={15}
                                    className="transition-transform duration-200 group-hover:translate-x-1"
                                />
                            </Link>
                        </div>
                    ) : (
                        <div className="hidden items-center gap-2 lg:flex">
                            <Link
                                to="/ai-budget"
                                className={`group inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                                    isActive('/ai-budget')
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                                }`}
                            >
                                <FiZap
                                    size={15}
                                    className={
                                        isActive('/ai-budget')
                                            ? 'text-blue-600'
                                            : 'text-slate-400'
                                    }
                                />

                                AI Budget Planner

                                <FiChevronDown
                                    size={13}
                                    className="rotate-[-90deg] text-slate-400 transition-transform group-hover:translate-x-0.5"
                                />
                            </Link>

                            <Link
                                to="/dashboard"
                                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                                    isActive('/dashboard')
                                        ? 'bg-slate-100 text-slate-950'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                                }`}
                            >
                                <FiBarChart2 size={15} />
                                Dashboard
                            </Link>

                            <div className="mx-2 h-6 w-px bg-slate-200" />

                            {/* User */}
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500">
                                    <FiUser size={16} />
                                </div>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
                                >
                                    <FiLogOut
                                        size={15}
                                        className="transition-transform group-hover:-translate-x-0.5"
                                    />

                                    Logout
                                </button>
                            </div>
                        </div>
                    )}

                    {/* =====================================================
                        MOBILE MENU BUTTON
                        ===================================================== */}
                    <button
                        type="button"
                        onClick={() =>
                            setIsMobileMenuOpen((previous) => !previous)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 lg:hidden"
                        aria-label={
                            isMobileMenuOpen
                                ? 'Close navigation menu'
                                : 'Open navigation menu'
                        }
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? (
                            <FiX size={20} />
                        ) : (
                            <FiMenu size={20} />
                        )}
                    </button>
                </nav>

                {/* =========================================================
                    MOBILE NAVIGATION
                    ========================================================= */}
                <div
                    className={`overflow-hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
                        isMobileMenuOpen
                            ? 'max-h-[520px] opacity-100'
                            : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6">
                        {!isLoggedIn ? (
                            <div className="space-y-1">
                                <Link
                                    to="/"
                                    className={`flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                                        isActive('/')
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    Home
                                </Link>

                                <Link
                                    to="/about"
                                    className={`flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                                        isActive('/about')
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    About
                                </Link>

                                <Link
                                    to="/login"
                                    className={`flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                                        isActive('/login')
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-600"
                                >
                                    Get started

                                    <FiArrowRight size={15} />
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                <Link
                                    to="/dashboard"
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                                        isActive('/dashboard')
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    <FiBarChart2 size={17} />
                                    Dashboard
                                </Link>

                                <Link
                                    to="/ai-budget"
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                                        isActive('/ai-budget')
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    <FiZap size={17} />
                                    AI Budget Planner
                                </Link>

                                <div className="my-2 h-px bg-slate-100" />

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-500 transition-colors hover:bg-red-50"
                                >
                                    <FiLogOut size={17} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* =============================================================
                NAVBAR SPACER

                Keeps page content from hiding underneath fixed navbar.
                ============================================================= */}
            <div className="h-[72px]" />
        </>
    );
};

export default Navbar;


// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//     const navigate = useNavigate();
//     const isLoggedIn = !!localStorage.getItem('token');

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         navigate('/');
//     };

//     return (
//         <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
//             <div className="container">
//                 <Link className="navbar-brand text-accent" to="/">
//                     <h3 className="fw-bold mb-0">💰 FinTrack</h3>
//                 </Link>
//                 <button
//                     className="navbar-toggler"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#navbarNav"
//                     aria-controls="navbarNav"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation"
//                 >
//                     <span className="navbar-toggler-icon"></span>
//                 </button>

//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav ms-auto">
//                         {!isLoggedIn ? (
//                             <>
//                                 <li className="nav-item">
//                                     <Link className="nav-link text-light" to="/">Home</Link>
//                                 </li>
//                                 <li className="nav-item">
//                                     <Link className="nav-link text-light" to="/about">About</Link>
//                                 </li>
//                                 <li className="nav-item">
//                                     <Link className="nav-link text-light" to="/login">Login</Link>
//                                 </li>
//                                 <li className="nav-item">
//                                     <Link className="nav-link text-light" to="/register">Register</Link>
//                                 </li>
//                             </>
//                         ) : (
//                             <>
//                                 <li className="nav-item">
//                                     <Link className="nav-link text-light" to="/ai-budget">AI Budget Planner</Link>
//                                 </li>
//                                 <li className="nav-item">
//                                     <button className="btn nav-link text-danger" onClick={handleLogout}>
//                                         Logout
//                                     </button>
//                                 </li>
//                             </>
//                         )}
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
