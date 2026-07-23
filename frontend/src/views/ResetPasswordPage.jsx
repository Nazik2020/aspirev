import React, { useState } from "react";
import Link from "next/link";
import AuthLayout from "../layouts/AuthLayout";
import logo from "../assets/aspirev.png";
import elena from "../assets/aspirev.png"; // Fallback for avatar

const ResetPasswordPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const leftContent = (
    <div className="flex flex-col h-full justify-between items-center text-center">
      <div className="flex flex-col items-center max-w-md w-full my-auto">
        {/* Logo */}
        <Link href="/" className="inline-block mb-8 -ml-2">
          <img
            src={logo.src}
            alt="Aspirev"
            className="h-16 md:h-20 w-auto object-contain invert dark:invert-0"
          />
        </Link>

        {/* Verified Secure Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 dark:border-white/5 bg-white dark:bg-[#17181c] mb-6">
          <span className="material-symbols-outlined text-[14px] text-slate-900 dark:text-[#00daf3]">
            verified_user
          </span>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 dark:text-white/50">
            Verified Secure
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl lg:text-[56px] font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-12">
          Secure your
          <br />
          architectural
          <br />
          legacy.
        </h1>

        {/* Testimonial Card */}
        <div className="w-full bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/10 rounded-2xl p-8 shadow-2xl text-left relative z-10">
          <p className="text-[15px] text-slate-600 dark:text-white/70 italic leading-relaxed mb-6 font-serif">
            "Your career is not just a series of jobs, but a structured data
            narrative. Secure access to your professional intelligence command
            center."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white dark:bg-[#1c1d22] border border-slate-200 dark:border-white/10 overflow-hidden shrink-0">
              <img
                src={logo.src}
                alt="Elena Vance"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white/90 uppercase tracking-widest">
                Elena Vance
              </div>
              <div className="text-[10px] font-semibold text-slate-500 dark:text-white/40 uppercase tracking-widest">
                Chief Strategy Architect
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-[0.65rem] tracking-[0.2em] font-black text-slate-400 dark:text-white/30 uppercase mt-auto pt-12 shrink-0">
        © 2026 INVIKT. CONQUER YOUR CAREER.
      </div>
    </div>
  );

  return (
    <AuthLayout leftContent={leftContent}>
      <div className="w-full">
        <div className="mb-10">
          <h2 className="text-[32px] font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
            Reset your password
          </h2>
          <p className="text-[15px] text-slate-600 dark:text-white/70">
            {isSubmitted
              ? "Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder."
              : "Enter your email and we will send you a reset link."}
          </p>
        </div>

        {!isSubmitted ? (
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              setIsSubmitted(true);
            }}
          >
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-widest font-bold text-slate-600 dark:text-white/70">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-slate-500 dark:text-white/40">
                  <span className="material-symbols-outlined text-[20px]">
                    mail
                  </span>
                </div>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 dark:bg-[#1c1d22]/50 border rounded-xl pl-12 pr-4 py-3 text-[14px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20 border-slate-200 dark:border-white/8 focus:border-violet-500/60 focus:outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#ab8ff4] to-[#814df3] text-slate-900 dark:text-white font-bold text-[15px] hover:shadow-[0_0_30px_rgba(129,77,243,0.3)] transition-all mt-4"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full py-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#1c1d22]/50 text-slate-900 dark:text-white font-bold text-[15px] hover:bg-slate-100 dark:bg-white/5 transition-colors"
            >
              Try another email
            </button>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/signin"
            className="inline-flex items-center text-[14px] text-slate-600 dark:text-white/60 hover:text-slate-900 dark:text-white font-medium transition-colors group"
          >
            <span className="material-symbols-outlined text-[18px] mr-2 group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            Back to Sign In
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
