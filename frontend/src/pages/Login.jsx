import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
    FiArrowRight,
    FiCheck,
    FiEye,
    FiEyeOff,
    FiLock,
    FiMail,
    FiShield,
    FiTrendingUp,
} from "react-icons/fi";

import { API_URL } from '../config/api';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await res.json();
            setLoading(false);

            if (res.ok) {
                alert("Login successful!");
                localStorage.setItem("token", data.token);
                navigate("/dashboard");
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Something went wrong");
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-50">
            {/* Background image */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/finance.jpg')",
                    }}
                    animate={{
                        scale: [1, 1.04, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Soft overlay */}
                <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px]" />

                {/* Gradient glow */}
                <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />
                <div className="absolute -right-40 bottom-10 h-[500px] w-[500px] rounded-full bg-violet-300/20 blur-3xl" />

                {/* Grid */}
                <div
                    className="absolute inset-0 opacity-[0.35]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.12) 1px, transparent 1px)",
                        backgroundSize: "42px 42px",
                    }}
                />
            </div>

            {/* Main content */}
            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-24 sm:px-6">
                <div className="grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">

                    {/* Left side */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="hidden lg:block"
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-bold text-blue-600 shadow-sm backdrop-blur">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                                <FiTrendingUp size={13} />
                            </span>
                            Smart financial management
                        </div>

                        <h1 className="max-w-xl text-5xl font-black leading-[1.05] tracking-tight text-slate-950 xl:text-6xl">
                            Welcome back to{" "}
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                FinTrack.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
                            Your financial workspace is waiting. Track your
                            spending, manage your budgets, and make smarter
                            financial decisions from one place.
                        </p>

                        <div className="mt-8 space-y-4">
                            {[
                                "Track income and expenses",
                                "Understand your spending habits",
                                "Build smarter financial goals",
                            ].map((item, index) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, x: -15 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.25 + index * 0.1,
                                    }}
                                    className="flex items-center gap-3 text-sm font-medium text-slate-700"
                                >
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                        <FiCheck size={15} />
                                    </span>
                                    {item}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Login card */}
                    <motion.div
                        initial={{ opacity: 0, y: 35, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            duration: 0.65,
                            ease: "easeOut",
                        }}
                        className="mx-auto w-full max-w-md"
                    >
                        <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-8">

                            {/* Header */}
                            <div className="mb-8 text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        delay: 0.2,
                                        type: "spring",
                                        stiffness: 180,
                                    }}
                                    className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/20"
                                >
                                    <FiLock size={23} />
                                </motion.div>

                                <h2 className="text-3xl font-black tracking-tight text-slate-950">
                                    Welcome back
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Sign in to continue managing your finances.
                                </p>
                            </div>

                            {/* Error */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
                                    role="alert"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-bold text-slate-700"
                                    >
                                        Email address
                                    </label>

                                    <div className="relative">
                                        <FiMail
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                            size={18}
                                        />

                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            placeholder="you@example.com"
                                            required
                                            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-bold text-slate-700"
                                        >
                                            Password
                                        </label>
                                    </div>

                                    <div className="relative">
                                        <FiLock
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                            size={18}
                                        />

                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            id="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            placeholder="Enter your password"
                                            required
                                            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-12 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            tabIndex={-1}
                                            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >
                                            {showPassword ? (
                                                <FiEyeOff size={18} />
                                            ) : (
                                                <FiEye size={18} />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Login button */}
                                <motion.button
                                    whileHover={!loading ? { y: -2 } : {}}
                                    whileTap={!loading ? { scale: 0.98 } : {}}
                                    type="submit"
                                    disabled={loading}
                                    className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
                                            Logging in...
                                        </>
                                    ) : (
                                        <>
                                            Login
                                            <FiArrowRight
                                                size={17}
                                                className="transition-transform duration-200 group-hover:translate-x-1"
                                            />
                                        </>
                                    )}
                                </motion.button>
                            </form>

                            {/* Security */}
                            <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
                                <FiShield size={14} className="text-emerald-500" />
                                Your account information stays secure
                            </div>

                            {/* Register */}
                            <div className="mt-6 border-t border-slate-100 pt-6 text-center">
                                <p className="text-sm text-slate-500">
                                    Don't have an account?{" "}
                                    <Link
                                        to="/register"
                                        className="font-bold text-blue-600 transition-colors hover:text-violet-600"
                                    >
                                        Create one
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Login;



// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const [showPassword, setShowPassword] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);

//         try {
//             const res = await fetch('http://localhost:3000/api/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password }),
//             });

//             const data = await res.json();
//             setLoading(false);

//             if (res.ok) {
//                 alert('Login successful!');
//                 localStorage.setItem('token', data.token);
//                 navigate('/dashboard');
//             } else {
//                 setError(data.message || 'Login failed');
//             }
//         } catch (err) {
//             console.error('Login error:', err);
//             console.log(err);
//             setError('Something went wrong');
//             setLoading(false);
//         }
//     };

//     return (
//         <motion.div
//             className="d-flex justify-content-center align-items-center vh-100 px-3"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//         >
//             <div className=" p-5 p-md-5 rounded shadow w-100" style={{ maxWidth: '420px' }}>
//                 <h2 className="mb-4 text-center fw-bold">Login Here</h2>
// <br />
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="email" className="form-label">Email address</label>
//                         <input
//                             type="email"
//                             id="email"
//                             className="form-control"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="password" className="form-label">Password</label>
//                         <div className="input-group">
//                             <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 id="password"
//                                 className="form-control"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                             />
                            
//                             <button
//                                 type="button"
//                                 className="btn btn-outline-secondary"
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 tabIndex={-1}
//                             >
//                                 {showPassword ? 'Hide' : 'Show'}
//                             </button>
//                         </div>
//                     </div>

//                     {error && (
//                         <div className="alert alert-danger text-center py-2" role="alert">
//                             {error}
//                         </div>
//                     )}

//                     <button type="submit" className="btn btn-success w-100 mt-3" disabled={loading}>
//                         {loading ? 'Logging in...' : 'Login'}
//                     </button>

//                     <p className="mt-3 text-center small">
//                         Don't have an account? <a href="/register">Register here</a>
//                     </p>
//                 </form>
//             </div>
//         </motion.div>
//     );
// };

// export default Login;
