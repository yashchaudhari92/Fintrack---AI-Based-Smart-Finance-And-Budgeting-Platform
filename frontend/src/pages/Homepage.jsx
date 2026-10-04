import React from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiBarChart2,
  FiCheck,
  FiChevronRight,
  FiCreditCard,
  FiDollarSign,
  FiMail,
  FiMic,
  FiPieChart,
  FiCamera,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

const features = [
  {
    icon: FiCreditCard,
    title: "Smart Transaction Tracking",
    description:
      "Record and organize your income and expenses effortlessly with intelligent categorization.",
    accent: "blue",
  },
  {
    icon: FiTarget,
    title: "Intelligent Budgeting",
    description:
      "Create personalized budgets and receive recommendations based on your spending patterns.",
    accent: "violet",
  },
  {
    icon: FiBarChart2,
    title: "Visual Analytics",
    description:
      "Understand where your money goes with clear charts, trends, and financial summaries.",
    accent: "cyan",
  },
  {
    icon: FiCamera,
    title: "AI Receipt Scanner",
    description:
      "Upload receipts or bills and let AI extract transaction details for faster expense tracking.",
    accent: "emerald",
  },
  {
    icon: FiMic,
    title: "Voice Assistant",
    description:
      "Log expenses naturally using your voice and make financial tracking faster than ever.",
    accent: "amber",
  },
  {
    icon: FiMail,
    title: "Daily Financial Reports",
    description:
      "Receive personalized summaries of your financial activity and stay informed every day.",
    accent: "rose",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your account",
    description:
      "Set up your secure FinTrack account and build your personal financial workspace.",
  },
  {
    number: "02",
    title: "Track your money",
    description:
      "Add income and expenses manually, through AI scanning, or using voice input.",
  },
  {
    number: "03",
    title: "Set your goals",
    description:
      "Create budgets and financial goals that match your lifestyle and priorities.",
  },
  {
    number: "04",
    title: "Grow with insights",
    description:
      "Use analytics and AI-powered recommendations to make better financial decisions.",
  },
];

const benefits = [
  "Simple and intuitive financial tracking",
  "AI-powered insights and recommendations",
  "Beautiful financial analytics",
  "Personalized budgeting tools",
  "Secure financial workspace",
  "Designed for everyday money management",
];

const featureAccentClasses = {
  blue: {
    icon: "bg-blue-50/80 text-blue-600 ring-blue-500/20 shadow-blue-500/5",
    glow: "from-blue-500/15",
  },
  violet: {
    icon: "bg-violet-50/80 text-violet-600 ring-violet-500/20 shadow-violet-500/5",
    glow: "from-violet-500/15",
  },
  cyan: {
    icon: "bg-cyan-50/80 text-cyan-600 ring-cyan-500/20 shadow-cyan-500/5",
    glow: "from-cyan-500/15",
  },
  emerald: {
    icon: "bg-emerald-50/80 text-emerald-600 ring-emerald-500/20 shadow-emerald-500/5",
    glow: "from-emerald-500/15",
  },
  amber: {
    icon: "bg-amber-50/80 text-amber-600 ring-amber-500/20 shadow-amber-500/5",
    glow: "from-amber-500/15",
  },
  rose: {
    icon: "bg-rose-50/80 text-rose-600 ring-rose-500/20 shadow-rose-500/5",
    glow: "from-rose-500/15",
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const LandingPage = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-50/50 text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* =====================================================
          HERO SECTION
          ===================================================== */}
      {/* =====================================================
    HERO SECTION
    ===================================================== */}
      <section className="relative overflow-hidden bg-white">
        {/* Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-1/2 top-[-260px] h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/[0.08] blur-[120px]" />

          <div className="absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full bg-cyan-400/[0.08] blur-[100px]" />

          <div className="absolute -right-32 top-32 h-[420px] w-[420px] rounded-full bg-violet-500/[0.08] blur-[110px]" />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8 lg:pb-28 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">

            {/* =================================================
          LEFT CONTENT
          ================================================= */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative z-10 text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-blue-700 shadow-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                    <FiZap size={11} />
                  </span>

                  AI-powered personal finance
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={fadeUp}
                className="mx-auto mt-6 max-w-2xl text-[2.9rem] font-black leading-[1.02] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:mx-0 lg:text-[4.25rem]"
              >
                Your money.
                <br />

                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Your control.
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg lg:mx-0"
              >
                Track spending, manage budgets, understand your financial
                habits, and make smarter decisions — all from one intelligent
                financial workspace.
              </motion.p>

              {/* CTA */}
              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
              >
                <a
                  href="/register"
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
                >
                  Start for free

                  <FiArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </a>

                <a
                  href="#features"
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
                >
                  Explore FinTrack

                  <FiChevronRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </a>
              </motion.div>

              {/* Trust points */}
              <motion.div
                variants={fadeUp}
                className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-semibold text-slate-500 lg:justify-start"
              >
                <span className="inline-flex items-center gap-2">
                  <FiCheck
                    size={14}
                    className="text-emerald-500"
                  />
                  Easy to use
                </span>

                <span className="inline-flex items-center gap-2">
                  <FiCheck
                    size={14}
                    className="text-emerald-500"
                  />
                  AI-powered
                </span>

                <span className="inline-flex items-center gap-2">
                  <FiCheck
                    size={14}
                    className="text-emerald-500"
                  />
                  Secure
                </span>
              </motion.div>
            </motion.div>

            {/* =================================================
          RIGHT FINANCIAL DASHBOARD
          ================================================= */}
            <motion.div
              initial={{ opacity: 0, x: 35, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 0.75,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mx-auto w-full max-w-[620px]"
            >
              {/* Glow */}
              <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-violet-500/15 blur-3xl" />

              {/* Dashboard */}
              <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-[0_30px_80px_-25px_rgba(15,23,42,0.25)]">

                {/* Browser-style top bar */}
                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    FinTrack Dashboard
                  </div>

                  <div className="h-7 w-7 rounded-lg bg-white shadow-sm" />
                </div>

                {/* Dashboard content */}
                <div className="mt-3 rounded-xl bg-slate-50 p-4 sm:p-5">

                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Financial overview
                      </p>

                      <h3 className="mt-1 text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">
                        Good morning 👋
                      </h3>
                    </div>

                    <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm sm:flex">
                      <FiBarChart2 size={18} />
                    </div>
                  </div>

                  {/* Balance card */}
                  <div className="mt-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-5 text-white shadow-xl shadow-slate-900/15">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Total balance
                        </p>

                        <p className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                          ₹84,250
                        </p>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-300 ring-1 ring-white/10">
                        <FiDollarSign size={19} />
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold text-emerald-300 ring-1 ring-emerald-500/20">
                        <FiTrendingUp size={11} />
                        +12.8%
                      </span>

                      <span className="text-[11px] text-slate-400">
                        compared with last month
                      </span>
                    </div>
                  </div>

                  {/* Income / Expense / Savings */}
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-3.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Income
                      </p>

                      <p className="mt-2 text-sm font-extrabold text-slate-900">
                        ₹52.4K
                      </p>

                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-[78%] rounded-full bg-emerald-500" />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-3.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Expenses
                      </p>

                      <p className="mt-2 text-sm font-extrabold text-slate-900">
                        ₹31.8K
                      </p>

                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-[52%] rounded-full bg-blue-500" />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-3.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Savings
                      </p>

                      <p className="mt-2 text-sm font-extrabold text-slate-900">
                        ₹20.6K
                      </p>

                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-[66%] rounded-full bg-violet-500" />
                      </div>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          Spending activity
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          Last 7 days
                        </p>
                      </div>

                      <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
                        This week
                      </span>
                    </div>

                    <div className="mt-5 flex h-24 items-end gap-2">
                      {[42, 68, 48, 82, 58, 76, 92].map(
                        (height, index) => (
                          <motion.div
                            key={index}
                            initial={{ height: 0 }}
                            whileInView={{
                              height: `${height}%`,
                            }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.5,
                              delay: index * 0.06,
                            }}
                            className="flex-1 rounded-t-md bg-gradient-to-t from-blue-600 to-indigo-400"
                          />
                        )
                      )}
                    </div>

                    <div className="mt-2 flex justify-between text-[9px] font-medium text-slate-400">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>

                  {/* AI insight */}
                  <div className="mt-4 flex items-center gap-3 rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 to-blue-50 p-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
                      <FiZap size={16} />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-violet-500">
                        AI insight
                      </p>

                      <p className="mt-0.5 text-xs font-semibold text-slate-700">
                        Your food spending is 14% higher this month.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating AI card */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.5 }}
                className="absolute -right-3 top-24 hidden rounded-2xl border border-white/80 bg-white/95 p-3 shadow-2xl shadow-slate-900/15 backdrop-blur-xl sm:block lg:-right-8"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <FiTrendingUp size={17} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Smart insight
                    </p>

                    <p className="text-xs font-extrabold text-slate-900">
                      Savings improving
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating transaction card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-white/80 bg-white/95 p-3 shadow-2xl shadow-slate-900/15 backdrop-blur-xl sm:block lg:-left-8"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <FiCreditCard size={17} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Recent expense
                    </p>

                    <p className="text-xs font-extrabold text-slate-900">
                      ₹1,240 · Dining
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VALUE STRIP
          ===================================================== */}
      <section className="border-y border-slate-200/80 bg-white/60 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-200/80 px-5 py-3 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 px-5 py-4 text-center sm:justify-start sm:text-left">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-500/20">
              <FiPieChart size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">One clear view</p>
              <p className="text-xs text-slate-500">Understand your finances</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 px-5 py-4 text-center sm:justify-start sm:text-left">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-500/20">
              <FiZap size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Intelligent insights</p>
              <p className="text-xs text-slate-500">Let AI find useful patterns</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 px-5 py-4 text-center sm:justify-start sm:text-left">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20">
              <FiShield size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Your financial workspace</p>
              <p className="text-xs text-slate-500">Simple, focused and secure</p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURES
          ===================================================== */}
      <section
        id="features"
        className="bg-slate-50/50 px-5 py-24 sm:px-6 lg:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex rounded-full bg-blue-50 border border-blue-200/60 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700 shadow-sm"
            >
              Everything in one place
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl"
            >
              Powerful tools for{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                smarter finances
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              Everything you need to understand your spending, build better
              habits, and move confidently toward your financial goals.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            variants={staggerContainer}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              const accent = featureAccentClasses[feature.accent];

              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/5 sm:p-8"
                >
                  <div
                    className={`pointer-events-none absolute right-0 top-0 h-40 w-40 bg-gradient-to-br ${accent.glow} to-transparent opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100`}
                  />

                  <div
                    className={`relative flex h-13 w-13 items-center justify-center rounded-2xl ring-1 shadow-sm ${accent.icon}`}
                  >
                    <Icon size={22} />
                  </div>

                  <h3 className="relative mt-6 text-lg font-bold text-slate-950">
                    {feature.title}
                  </h3>

                  <p className="relative mt-3 text-sm leading-relaxed text-slate-500">
                    {feature.description}
                  </p>

                  <div className="relative mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition-colors group-hover:text-blue-600">
                    Learn more
                    <FiArrowRight
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      size={14}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          AI FEATURE SHOWCASE
          ===================================================== */}
      <section className="relative overflow-hidden bg-slate-950 px-5 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-blue-600/15 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-300 backdrop-blur-md">
              <FiZap size={13} />
              Intelligent Finance
            </span>

            <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Your finances.
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                A little smarter.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              FinTrack turns your financial activity into useful insights.
              Understand your spending, discover patterns, and make decisions
              with more confidence.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Understand your spending patterns",
                "Build smarter financial habits",
                "Make decisions using meaningful insights",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30">
                    <FiCheck size={14} />
                  </span>
                  <span className="text-sm font-medium text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI visual card */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur-2xl sm:p-6">
              <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      AI financial insight
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-white">
                      Spending overview
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    <FiBarChart2 size={20} />
                  </div>
                </div>

                {/* Fake chart */}
                <div className="mt-8 flex h-44 items-end gap-3.5 border-b border-l border-white/10 px-3 pb-0">
                  {[38, 58, 44, 72, 54, 82, 68, 94, 76, 88].map(
                    (height, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.05,
                        }}
                        className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 via-indigo-500 to-cyan-400 opacity-90 shadow-lg shadow-blue-500/20"
                      />
                    )
                  )}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md">
                    <p className="text-xs font-medium text-slate-400">Smart insight</p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      Spending trends identified
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md">
                    <p className="text-xs font-medium text-slate-400">Recommendation</p>
                    <p className="mt-2 text-sm font-semibold text-emerald-400">
                      Improve monthly savings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
          ===================================================== */}
      <section className="bg-slate-50/50 px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex rounded-full bg-violet-50 border border-violet-200/60 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-700 shadow-sm">
              Simple by design
            </span>

            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              How FinTrack works
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Start small, stay consistent, and let FinTrack help you make
              better financial decisions over time.
            </p>
          </div>

          <div className="relative mt-16">
            {/* Desktop connector */}
            <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-gradient-to-r from-blue-200 via-violet-200 to-emerald-200 lg:block" />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerContainer}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  className="relative text-center group"
                >
                  <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-slate-50 bg-white text-sm font-extrabold text-blue-600 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200/80 transition-transform duration-300 group-hover:scale-105">
                    {step.number}
                  </div>

                  <h3 className="mt-6 text-base font-bold text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-500">
                    {step.description}
                  </p>

                  {index !== steps.length - 1 && (
                    <div className="mx-auto mt-6 h-px w-16 bg-slate-200 lg:hidden" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY FINTRACK
          ===================================================== */}
      <section
        id="about"
        className="bg-white px-5 py-24 sm:px-6 lg:px-8 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex rounded-full bg-emerald-50 border border-emerald-200/60 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700 shadow-sm">
              Built around you
            </span>

            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              More than an expense tracker.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Your financial life is more than a list of transactions.
              FinTrack gives you the tools to understand your money and turn
              everyday financial activity into better habits.
            </p>

            <a
              href="/register"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-colors hover:text-blue-700"
            >
              Start building better habits
              <FiArrowRight
                className="transition-transform duration-200 group-hover:translate-x-1"
                size={16}
              />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="grid gap-3.5 sm:grid-cols-2"
          >
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-start gap-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-1 ring-emerald-500/20">
                  <FiCheck size={14} />
                </span>

                <span className="text-sm font-semibold leading-relaxed text-slate-700">
                  {benefit}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          CONTACT / QUESTION
          ===================================================== */}
      <section
        id="contact"
        className="bg-slate-50/50 px-5 py-24 sm:px-6 lg:px-8 lg:py-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          <div className="mb-12 text-center">
            <span className="inline-flex rounded-full bg-blue-50 border border-blue-200/60 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700 shadow-sm">
              Get in touch
            </span>

            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Have a question?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
              We'd love to hear from you. Send us a message and we'll get back
              to you as soon as possible.
            </p>
          </div>

          <form className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-900/5 sm:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Your name
                </label>

                <input
                  id="contact-name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Message
              </label>

              <textarea
                id="contact-message"
                rows="5"
                placeholder="Tell us how we can help..."
                required
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 font-semibold text-white shadow-lg shadow-slate-950/15 transition-all duration-200 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-600/25"
            >
              Send Message
              <FiArrowRight size={16} />
            </motion.button>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;



// import React from 'react';
// import { motion } from 'framer-motion';

// const LandingPage = () => {

//   return (
//     <div>

//       {/* Hero Section */}
//       <motion.section
//         className="text-center mt-5"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         <div className="container">
//           <h1 className="display-1 fw-bold"
//             style={{
//               background: 'linear-gradient(90deg,rgb(81, 0, 255),rgb(169, 27, 235))',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               display: 'inline-block'
//             }}
//           >
//             Manage Your Finances <br /> with Intelligence
//           </h1>
//           <p className="lead mt-3">
//             <b>An AI-powered financial management platform that helps you track,<br />
//               analyze, and optimize your spending with real-time insights.</b>
//           </p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             className='btn btn-dark btn-lg mt-4'
//           >
//             <a className="text-white text-decoration-none" href="/register">
//               Get Started →
//             </a>
//           </motion.button>
//         </div>
//       </motion.section>
//       <br />

//       {/* AI Finance Image Section - Dark Theme, Responsive, Image Left */}
//       <motion.section
//         className="py-5"
//         style={{
//           backgroundColor: '#121212',
//           color: '#f1f1f1',
//         }}
//         initial={{ opacity: 0, scale: 0.9, y: 100 }}
//         whileInView={{ opacity: 1, scale: 1, y: 0 }}
//         transition={{ duration: 1.2 }}
//         viewport={{ once: true }}
//       >
//         <div className="container d-flex flex-column-reverse flex-md-row align-items-center justify-content-between gap-4">
//           {/* Text Content */}
//           <div className="text-center text-md-start mt-4 mt-md-0">
//             <motion.h2
//               className="fw-bold"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1 }}
//               style={{ fontSize: '2rem' }}
//             >
//               Smarter Tool. Smarter Money Management.
//             </motion.h2>
//             <p className="mt-3" style={{ fontSize: '1.1rem', color: '#cccccc' }}>
//               Harness the power of AI to track spending, optimize savings, and predict future financial trends. Your intelligent budgeting partner is here.
//             </p>
//           </div>

//           {/* Image Content */}
//           <motion.img
//             src="/finance.jpg"
//             alt="AI Smart Finance Illustration"
//             className="shadow-lg"
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.5 }}
//             style={{
//               width: '80%',
//               maxWidth: '500px',
//               borderRadius: '20px',
//               boxShadow: '0 10px 25px rgba(255, 255, 255, 0.1)',
//             }}
//           />
//         </div>
//       </motion.section>



//       {/* Features Section */}
//       <section id="features" className="py-5 ">
//         <div className="container">
//           <h2 className="text-center mb-5 fw-bold">Powerful Tools to Empower You</h2>
//           <div className="row text-center g-4">

//             <div className="col-md-4">
//               <motion.div whileHover={{ scale: 1.05 }} className="p-4 shadow rounded bg-dark text-white">
//                 <img src="https://img.icons8.com/color/96/money--v1.png" alt="Track Transactions" className="mb-3" />
//                 <h5>Track Transactions</h5>
//                 <p>Automatically record and categorize your income & expenses with real-time AI support.</p>
//               </motion.div>
//             </div>

//             <div className="col-md-4">
//               <motion.div whileHover={{ scale: 1.05 }} className="p-4 shadow rounded bg-white">
//                 <img src="https://img.icons8.com/color/96/budget.png" alt="Budgeting" className="mb-3" />
//                 <h5>Smart Budgeting</h5>
//                 <p>Create customized budgets with intelligent recommendations based on your lifestyle and goals.</p>
//               </motion.div>
//             </div>

//             <div className="col-md-4">
//               <motion.div whileHover={{ scale: 1.05 }} className="p-4 shadow rounded bg-white">
//                 <img src="https://img.icons8.com/color/96/statistics.png" alt="Analytics" className="mb-3" />
//                 <h5>Visual Analytics</h5>
//                 <p>Stay informed with interactive charts and visual summaries of your financial trends.</p>
//               </motion.div>
//             </div>

//             <div className="col-md-4">
//               <motion.div whileHover={{ scale: 1.05 }} className="p-4 shadow rounded bg-white">
//                 <img src="https://img.icons8.com/color/96/scan-stock.png" alt="Auto Scan" className="mb-3" />
//                 <h5>Auto Scan with AI</h5>
//                 <p>Snap receipts or bills and let AI extract and log the data for quick transaction entries.</p>
//               </motion.div>
//             </div>

//             <div className="col-md-4">
//               <motion.div whileHover={{ scale: 1.05 }} className="p-4 shadow rounded bg-white">
//                 <img src="https://img.icons8.com/color/96/voice-presentation.png" alt="Voice Assistant" className="mb-3" />
//                 <h5>Voice Assistant</h5>
//                 <p>Just speak to log your expenses. Our AI assistant makes money tracking easier than ever.</p>
//               </motion.div>
//             </div>

//             <div className="col-md-4">
//               <motion.div whileHover={{ scale: 1.05 }} className="p-4 shadow rounded bg-dark text-white">
//                 <img src="https://img.icons8.com/color/96/email.png" alt="Daily Reports" className="mb-3" />
//                 <h5>Daily Email Reports</h5>
//                 <p>Receive a personalized summary of your financial activity directly to your inbox every day.</p>
//               </motion.div>
//             </div>

//           </div>
//         </div>
//       </section>
//       <br />
//       {/* How It Works Section */}
//       <section className="bg-dark py-5 text-white text-center">
//         <div className="container">
//           <h2 className="mb-4">How SmartFinance Works</h2>
//           <div className="row">
//             <div className="col-md-3">
//               <motion.div whileHover={{ scale: 1.05 }} className="p-3">
//                 <h5>1. Sign Up</h5>
//                 <p>Create a secure account and connect your financial sources.</p>
//               </motion.div>
//             </div>
//             <div className="col-md-3">
//               <motion.div whileHover={{ scale: 1.05 }} className="p-3">
//                 <h5>2. Add or Track</h5>
//                 <p>Transactions are added and categorized automatically in real-time.</p>
//               </motion.div>
//             </div>
//             <div className="col-md-3">
//               <motion.div whileHover={{ scale: 1.05 }} className="p-3">
//                 <h5>3. Set Budgets</h5>
//                 <p>Set financial budgets or reducing debt.</p>
//               </motion.div>
//             </div>
//             <div className="col-md-3">
//               <motion.div whileHover={{ scale: 1.05 }} className="p-3">
//                 <h5>4. Grow</h5>
//                 <p>Receive personalized suggestions and insights to improve your financial health.</p>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <br />

//       {/* About Section */}
//       <section id="about" className="bg-light py-5 text-center">
//         <div className="container">
//           <h2 className="mb-4">Why Choose SmartFinance?</h2>
//           <p className="lead">We offer more than just expense tracking. Our platform provides AI-driven insights, simplifies your budgeting journey, and ensures you never lose track of your financial goals. Trusted by students, professionals, and entrepreneurs across India.</p>
//         </div>
//       </section>
// <br />
//       {/* Contact Section */}
//       <motion.section
//         id="contact"
//         className="py-5"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         viewport={{ once: true }}
//       >
//         <div className="container">
//           <h2 className="text-center mb-4 fw-bold">Have a Question?</h2>
//           <p className="text-center mb-5 text-muted">
//             We'd love to hear from you! Reach out and our team will respond promptly.
//           </p>
//           <form
//             className="mx-auto shadow p-4 rounded bg-white"
//             style={{ maxWidth: '600px' }}
//           >
//             <div className="mb-3">
//               <label className="form-label fw-semibold">Your Name</label>
//               <input type="text" className="form-control" placeholder="Enter your name" required />
//             </div>
//             <div className="mb-3">
//               <label className="form-label fw-semibold">Email Address</label>
//               <input type="email" className="form-control" placeholder="Enter your email" required />
//             </div>
//             <div className="mb-3">
//               <label className="form-label fw-semibold">Message</label>
//               <textarea className="form-control" rows="4" placeholder="Write your message" required></textarea>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.3 }}
//               type="submit"
//               className="btn btn-dark w-100"
//             >
//               Send Message ✉️
//             </motion.button>
//           </form>
//         </div>
//       </motion.section>


//       {/* Sponsorship Section */}
//       {/* <section className="bg-white py-4 text-center border-top">
//         <div className="container">
//           <p className="lead mb-0">
//             <strong>Sponsored by:</strong> <span style={{ color: '#5e17eb'}}> <a href="https://www.ezioinfotech.com/" style={{}}>Ezio InfoTech Pvt Ltd</a> </span>
//           </p>
//         </div>
//       </section> */}


//       {/* Footer Call-to-Action */}
//       <footer className="bg-dark text-white text-center py-4">
//         <div className="container">
//           <h4 className="mb-3">Ready to Take Control of Your Finances?</h4>
//           <a href="/register" className="btn btn-outline-light btn-lg">Join SmartFinance Now</a>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;
