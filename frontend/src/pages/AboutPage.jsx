import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiArrowRight,
    FiBarChart2,
    FiCheck,
    FiChevronRight,
    FiLock,
    FiPieChart,
    FiShield,
    FiTarget,
    FiTrendingUp,
    FiZap,
} from "react-icons/fi";
import { Link } from "react-router-dom";

/* =========================================================
   BACKGROUND IMAGES

   The first image uses your existing project image.
   The additional images create the animated financial/
   technology atmosphere behind the About page.
========================================================= */

const backgroundImages = [
    "/finance.jpg",
    "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=2200&q=85",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2200&q=85",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2200&q=85",
];

/* =========================================================
   FEATURES
========================================================= */

const features = [
    {
        icon: FiZap,
        title: "Smart Insights",
        description:
            "Our AI analyzes your past spending to provide real-time suggestions that help you save more and spend smarter.",
        iconClass: "bg-blue-50 text-blue-600",
    },
    {
        icon: FiBarChart2,
        title: "Dynamic Visualizations",
        description:
            "Understand your finances at a glance with interactive charts and personalized dashboards.",
        iconClass: "bg-violet-50 text-violet-600",
    },
    {
        icon: FiShield,
        title: "Secure & Private",
        description:
            "Your financial data is encrypted end-to-end, ensuring your privacy and security are always protected.",
        iconClass: "bg-emerald-50 text-emerald-600",
    },
    {
        icon: FiTarget,
        title: "Budget Automation",
        description:
            "Set goals and let our AI auto-adjust your budgets monthly to keep you on track with minimal effort.",
        iconClass: "bg-amber-50 text-amber-600",
    },
];

/* =========================================================
   BENEFITS
========================================================= */

const benefits = [
    "Understand your spending habits",
    "Build smarter and personalized budgets",
    "Get intelligent financial insights",
    "Visualize your financial progress",
];

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 35,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const fadeLeft = {
    hidden: {
        opacity: 0,
        x: -45,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const fadeRight = {
    hidden: {
        opacity: 0,
        x: 45,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

/* =========================================================
   ABOUT PAGE
========================================================= */

const AboutPage = () => {
    const [currentImage, setCurrentImage] = useState(0);

    /* -------------------------------------------------------
       Background image slider
    ------------------------------------------------------- */

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((previous) =>
                previous === backgroundImages.length - 1
                    ? 0
                    : previous + 1
            );
        }, 5500);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-screen overflow-hidden bg-white text-slate-950">
            {/* =====================================================
                HERO
            ===================================================== */}

            <section className="relative min-h-[720px] overflow-hidden">
                {/* -------------------------------------------------
                    SLIDING BACKGROUND IMAGES
                ------------------------------------------------- */}

                <div className="absolute inset-0">
                    <AnimatePresence mode="sync">
                        <motion.div
                            key={currentImage}
                            initial={{
                                opacity: 0,
                                scale: 1.08,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 1.03,
                            }}
                            transition={{
                                opacity: {
                                    duration: 1.4,
                                },
                                scale: {
                                    duration: 6,
                                    ease: "linear",
                                },
                            }}
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url("${backgroundImages[currentImage]}")`,
                            }}
                        />
                    </AnimatePresence>

                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-white/82" />

                    {/* Blue/violet atmosphere */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white/75 to-violet-100/80" />

                    {/* Grid */}
                    <div
                        className="absolute inset-0 opacity-[0.3]"
                        style={{
                            backgroundImage:
                                "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />

                    {/* Soft glow */}
                    <motion.div
                        animate={{
                            x: [0, 30, 0],
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -left-40 top-10 h-[400px] w-[400px] rounded-full bg-blue-300/25 blur-3xl"
                    />

                    <motion.div
                        animate={{
                            x: [0, -30, 0],
                            y: [0, 25, 0],
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-violet-300/25 blur-3xl"
                    />
                </div>

                {/* -------------------------------------------------
                    HERO CONTENT
                ------------------------------------------------- */}

                <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-5 py-24 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]"
                    >
                        {/* LEFT */}
                        <div>
                            <motion.div
                                variants={fadeLeft}
                                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/85 px-4 py-2 text-xs font-bold text-blue-700 shadow-sm backdrop-blur-md"
                            >
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                                    <FiZap size={11} />
                                </span>

                                About FinTrack
                            </motion.div>

                            <motion.h1
                                variants={fadeLeft}
                                className="mt-7 max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl"
                            >
                                Smarter tools for a
                                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                    smarter financial life.
                                </span>
                            </motion.h1>

                            <motion.p
                                variants={fadeLeft}
                                className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg"
                            >
                                FinTrack brings intelligent financial
                                tracking, budgeting, analytics, and AI-powered
                                insights together in one simple workspace.
                            </motion.p>

                            <motion.div
                                variants={fadeLeft}
                                className="mt-8 flex flex-col gap-3 sm:flex-row"
                            >
                                <Link
                                    to="/register"
                                    className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-slate-50 hover:shadow-lg sm:w-auto"
                                >
                                    Get started for free

                                    <FiArrowRight
                                        size={16}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </Link>

                                <Link
                                    to="/"
                                    className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold text-slate-600 transition-all duration-300 hover:bg-white/70 hover:text-blue-600 sm:w-auto"
                                >
                                    Explore FinTrack

                                    <FiChevronRight
                                        size={15}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </Link>
                            </motion.div>

                            {/* Trust points */}
                            <motion.div
                                variants={fadeLeft}
                                className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
                            >
                                {[
                                    "AI-powered",
                                    "Secure",
                                    "Easy to use",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-2 text-xs font-semibold text-slate-500"
                                    >
                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                                            <FiCheck size={11} />
                                        </span>

                                        {item}
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* RIGHT DASHBOARD */}
                        <motion.div
                            variants={fadeRight}
                            className="relative"
                        >
                            <motion.div
                                animate={{
                                    y: [0, -8, 0],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="relative rounded-[28px] border border-white/80 bg-white/85 p-3 shadow-2xl shadow-blue-900/10 backdrop-blur-xl sm:p-4"
                            >
                                {/* Browser header */}
                                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                                    <div className="flex gap-1.5">
                                        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                    </div>

                                    <span className="text-[10px] font-bold text-slate-400">
                                        FinTrack Dashboard
                                    </span>

                                    <div className="h-5 w-5 rounded-md bg-white shadow-sm" />
                                </div>

                                <div className="mt-3 rounded-2xl bg-slate-50 p-4 sm:p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                                                Financial overview
                                            </p>

                                            <h3 className="mt-1 text-lg font-black text-slate-900">
                                                Good financial habits 👋
                                            </h3>
                                        </div>

                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <FiPieChart size={17} />
                                        </div>
                                    </div>

                                    {/* Balance */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        whileInView={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        viewport={{
                                            once: true,
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.25,
                                        }}
                                        className="mt-4 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-5 text-white"
                                    >
                                        <p className="text-[10px] text-slate-400">
                                            Financial intelligence
                                        </p>

                                        <div className="mt-1 flex items-center justify-between">
                                            <span className="text-xl font-black">
                                                Better decisions
                                            </span>

                                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
                                                <FiTrendingUp size={18} />
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center gap-2">
                                            <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                                                ↑ Smarter spending
                                            </span>

                                            <span className="text-[9px] text-slate-400">
                                                powered by insights
                                            </span>
                                        </div>
                                    </motion.div>

                                    {/* Stats */}
                                    <div className="mt-4 grid grid-cols-3 gap-2.5">
                                        {[
                                            {
                                                label: "Insights",
                                                value: "AI",
                                                icon: FiZap,
                                            },
                                            {
                                                label: "Analytics",
                                                value: "Live",
                                                icon: FiBarChart2,
                                            },
                                            {
                                                label: "Security",
                                                value: "Safe",
                                                icon: FiShield,
                                            },
                                        ].map((stat, index) => {
                                            const Icon = stat.icon;

                                            return (
                                                <motion.div
                                                    key={stat.label}
                                                    initial={{
                                                        opacity: 0,
                                                        y: 15,
                                                    }}
                                                    whileInView={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    viewport={{
                                                        once: true,
                                                    }}
                                                    transition={{
                                                        delay:
                                                            0.35 +
                                                            index * 0.1,
                                                    }}
                                                    className="rounded-xl border border-slate-200 bg-white p-3"
                                                >
                                                    <Icon
                                                        size={14}
                                                        className="text-blue-600"
                                                    />

                                                    <p className="mt-2 text-[9px] font-bold uppercase tracking-wide text-slate-400">
                                                        {stat.label}
                                                    </p>

                                                    <p className="mt-0.5 text-sm font-black text-slate-800">
                                                        {stat.value}
                                                    </p>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* Activity */}
                                    <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-bold text-slate-700">
                                                    Financial activity
                                                </p>

                                                <p className="text-[9px] text-slate-400">
                                                    Last 7 days
                                                </p>
                                            </div>

                                            <span className="rounded-lg bg-blue-50 px-2 py-1 text-[9px] font-bold text-blue-600">
                                                This week
                                            </span>
                                        </div>

                                        <div className="mt-4 flex h-20 items-end gap-2">
                                            {[35, 55, 42, 72, 52, 65, 82].map(
                                                (height, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{
                                                            height: 0,
                                                        }}
                                                        whileInView={{
                                                            height: `${height}%`,
                                                        }}
                                                        viewport={{
                                                            once: true,
                                                        }}
                                                        transition={{
                                                            duration: 0.7,
                                                            delay:
                                                                index * 0.08,
                                                        }}
                                                        className="flex-1 rounded-t-md bg-gradient-to-t from-blue-600 to-indigo-400"
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating insight */}
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute -right-3 top-20 hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl shadow-slate-300/30 sm:flex lg:-right-8"
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <FiTrendingUp size={16} />
                                </div>

                                <div>
                                    <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                                        Smart insight
                                    </p>

                                    <p className="text-xs font-black text-slate-700">
                                        Spending improving
                                    </p>
                                </div>
                            </motion.div>

                            {/* Floating security */}
                            <motion.div
                                animate={{
                                    y: [0, 8, 0],
                                }}
                                transition={{
                                    duration: 4.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl shadow-slate-300/30 sm:flex lg:-left-8"
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <FiLock size={16} />
                                </div>

                                <div>
                                    <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                                        Protected
                                    </p>

                                    <p className="text-xs font-black text-slate-700">
                                        Secure workspace
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* -------------------------------------------------
                    SLIDER INDICATORS
                ------------------------------------------------- */}

                <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-2">
                    {backgroundImages.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setCurrentImage(index)}
                            aria-label={`Show background ${index + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                                currentImage === index
                                    ? "w-8 bg-blue-600"
                                    : "w-2 bg-slate-300 hover:bg-slate-400"
                            }`}
                        />
                    ))}
                </div>
            </section>

            {/* =====================================================
                MISSION SECTION
            ===================================================== */}

            <section className="relative border-y border-slate-100 bg-slate-50/60">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                        {/* Text */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true,
                                amount: 0.2,
                            }}
                            variants={containerVariants}
                        >
                            <motion.div
                                variants={fadeLeft}
                                className="mb-5 flex items-center gap-3"
                            >
                                <span className="h-px w-10 bg-blue-600" />

                                <span className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                                    Why FinTrack
                                </span>
                            </motion.div>

                            <motion.h2
                                variants={fadeLeft}
                                className="text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl"
                            >
                                Everything you need to make
                                <span className="text-blue-600">
                                    {" "}better money decisions.
                                </span>
                            </motion.h2>

                            <motion.p
                                variants={fadeLeft}
                                className="mt-5 max-w-xl text-base leading-7 text-slate-500"
                            >
                                Managing personal finances shouldn't require
                                complicated spreadsheets or hours of manual
                                analysis. FinTrack brings your financial
                                information and intelligent tools together in
                                one focused workspace.
                            </motion.p>

                            <motion.div
                                variants={containerVariants}
                                className="mt-8 grid gap-3 sm:grid-cols-2"
                            >
                                {benefits.map((benefit) => (
                                    <motion.div
                                        key={benefit}
                                        variants={fadeUp}
                                        className="flex items-start gap-3"
                                    >
                                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                            <FiCheck size={12} />
                                        </span>

                                        <span className="text-sm font-semibold leading-5 text-slate-600">
                                            {benefit}
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Visual */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true,
                                amount: 0.2,
                            }}
                            variants={fadeRight}
                            className="relative"
                        >
                            <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/60 sm:p-5">
                                <div className="rounded-2xl bg-slate-50 p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                                                Financial overview
                                            </p>

                                            <h3 className="mt-1 text-lg font-black text-slate-900">
                                                Your financial workspace
                                            </h3>
                                        </div>

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <FiPieChart size={18} />
                                        </div>
                                    </div>

                                    <motion.div
                                        whileHover={{
                                            scale: 1.015,
                                        }}
                                        className="mt-5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-5 text-white shadow-lg shadow-blue-600/20"
                                    >
                                        <p className="text-xs font-medium text-blue-100">
                                            Financial clarity
                                        </p>

                                        <div className="mt-2 flex items-end justify-between gap-4">
                                            <span className="text-2xl font-black">
                                                Smart insights
                                            </span>

                                            <FiTrendingUp size={24} />
                                        </div>

                                        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/20">
                                            <motion.div
                                                initial={{
                                                    width: 0,
                                                }}
                                                whileInView={{
                                                    width: "78%",
                                                }}
                                                viewport={{
                                                    once: true,
                                                }}
                                                transition={{
                                                    duration: 1.2,
                                                    delay: 0.3,
                                                }}
                                                className="h-full rounded-full bg-white"
                                            />
                                        </div>
                                    </motion.div>

                                    <div className="mt-4 grid grid-cols-3 gap-3">
                                        {[
                                            ["Insights", "AI"],
                                            ["Analytics", "Live"],
                                            ["Security", "Safe"],
                                        ].map(([label, value], index) => (
                                            <motion.div
                                                key={label}
                                                initial={{
                                                    opacity: 0,
                                                    y: 15,
                                                }}
                                                whileInView={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                viewport={{
                                                    once: true,
                                                }}
                                                transition={{
                                                    delay:
                                                        0.2 +
                                                        index * 0.1,
                                                }}
                                                className="rounded-xl border border-slate-200 bg-white p-3"
                                            >
                                                <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                                                    {label}
                                                </p>

                                                <p className="mt-1 text-sm font-black text-slate-800">
                                                    {value}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                FEATURES
            ===================================================== */}

            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.15,
                        }}
                        variants={containerVariants}
                    >
                        <motion.div
                            variants={fadeUp}
                            className="mx-auto max-w-2xl text-center"
                        >
                            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-blue-700">
                                <FiZap size={12} />
                                Built around you
                            </span>

                            <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                                Powerful tools for smarter finances
                            </h2>

                            <p className="mt-4 text-base leading-7 text-slate-500">
                                Everything you need to understand your money,
                                build better habits, and move confidently
                                toward your financial goals.
                            </p>
                        </motion.div>

                        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;

                                return (
                                    <motion.div
                                        key={feature.title}
                                        variants={fadeUp}
                                        whileHover={{
                                            y: -8,
                                        }}
                                        transition={{
                                            duration: 0.25,
                                        }}
                                        className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-200/70"
                                    >
                                        {/* Hover glow */}
                                        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-blue-100/40 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                                        <div
                                            className={`relative flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconClass} transition-transform duration-300 group-hover:scale-110`}
                                        >
                                            <Icon size={21} />
                                        </div>

                                        <h3 className="relative mt-6 text-lg font-black tracking-[-0.02em] text-slate-900">
                                            {feature.title}
                                        </h3>

                                        <p className="relative mt-3 text-sm leading-6 text-slate-500">
                                            {feature.description}
                                        </p>

                                        <div className="relative mt-6 flex items-center gap-2 text-xs font-bold text-blue-600">
                                            Explore feature

                                            <FiArrowRight
                                                size={13}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* =====================================================
                FINAL CTA
            ===================================================== */}

            <section className="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24">
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 35,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    transition={{
                        duration: 0.7,
                    }}
                    className="relative mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-violet-50 px-6 py-16 text-center sm:px-10 lg:px-16"
                >
                    {/* Animated glow */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-200/50 blur-3xl"
                    />

                    <motion.div
                        animate={{
                            scale: [1.1, 1, 1.1],
                            opacity: [0.3, 0.45, 0.3],
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet-200/50 blur-3xl"
                    />

                    <div className="relative">
                        <motion.div
                            initial={{
                                scale: 0.7,
                                opacity: 0,
                            }}
                            whileInView={{
                                scale: 1,
                                opacity: 1,
                            }}
                            viewport={{
                                once: true,
                            }}
                            transition={{
                                duration: 0.5,
                            }}
                            className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm"
                        >
                            <FiTrendingUp size={22} />
                        </motion.div>

                        <h2 className="mt-6 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                            Ready to take control of your finances?
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                            Start tracking smarter, understand your money
                            better, and build healthier financial habits with
                            FinTrack.
                        </p>

                        <Link
                            to="/register"
                            className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-slate-50 hover:shadow-lg"
                        >
                            Create your free account

                            <FiArrowRight
                                size={16}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                </motion.div>
            </section>
        </main>
    );
};

export default AboutPage;



// import React from "react";
// import { motion } from "framer-motion";

// const containerVariants = {
//     hidden: { opacity: 0, y: 40 },
//     visible: {
//         opacity: 1,
//         y: 0,
//         transition: {
//             duration: 0.6,
//             when: "beforeChildren",
//             staggerChildren: 0.3,
//         },
//     },
// };

// const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0 },
// };

// const features = [
//     {
//         image: "https://cdn-icons-png.flaticon.com/512/9799/9799759.png",
//         title: "Smart Insights",
//         description:
//             "Our AI analyzes your past spending to provide real-time suggestions that help you save more and spend smarter.",
//     },
//     {
//         image: "https://cdn-icons-png.flaticon.com/512/4149/4149658.png",
//         title: "Dynamic Visualizations",
//         description:
//             "Understand your finances at a glance with interactive charts and personalized dashboards.",
//     },
//     {
//         image: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png",
//         title: "Secure & Private",
//         description:
//             "Your financial data is encrypted end-to-end, ensuring your privacy and security are always protected.",
//     },
//     {
//         image: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
//         title: "Budget Automation",
//         description:
//             "Set goals and let our AI auto-adjust your budgets monthly to keep you on track with minimal effort.",
//     },
// ];

// const AboutPage = () => {
//     return (
//         <motion.div
//             className="container mt-5 pt-5"
//             initial="hidden"
//             animate="visible"
//             variants={containerVariants}
//         >
//             <motion.h1
//                 className="text-center mb-4"
//                 variants={itemVariants}
//             >
//                 <strong>About Smart Finance Tracker</strong>
//             </motion.h1>

//             <motion.p
//                 className="text-center lead mb-5"
//                 variants={itemVariants}
//             >
//                 SmartBudgetAI is your intelligent partner in personal finance. Powered by AI, our platform tracks expenses,
//                 predicts spending habits, and helps you build smarter budgets tailored to your lifestyle.
//             </motion.p>

//             <div className="row">
//                 {features.map((feature, index) => (
//                     <motion.div
//                         key={index}
//                         className="col-md-6 col-lg-3 mb-4"
//                         variants={itemVariants}
//                     >
//                         <div className="card h-100 shadow-sm border-0 transition-transform" style={{ transition: 'transform 0.3s' }}>
//                             <img
//                                 src={feature.image}
//                                 alt={feature.title}
//                                 className="card-img-top p-3"
//                                 style={{ height: "120px", objectFit: "contain" }}
//                             />
//                             <div className="card-body text-center">
//                                 <h5 className="card-title">{feature.title}</h5>
//                                 <p className="card-text text-muted">{feature.description}</p>
//                             </div>
//                         </div>
//                     </motion.div>
//                 ))}
//             </div>
//         </motion.div>
//     );
// };

// export default AboutPage;
