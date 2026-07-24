import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "../layouts/AuthLayout";
import logo from "../assets/aspirev.png";
import { useAuth } from "../context/AuthContext";

// ─── Icons ───────────────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 mr-3" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 mr-3 fill-current">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const EyeIcon = ({ off, className }) => off ? (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
) : (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);

const CheckIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);

const CrossIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

const FeatureItem = ({ text }) => (
  <div className="flex items-center text-slate-700 dark:text-white/80 font-medium">
    <div className="w-7 h-7 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center bg-slate-100 dark:bg-white/5 mr-4 shrink-0">
      <span className="material-symbols-outlined text-[14px] text-slate-900 dark:text-[#cdbdff]">check</span>
    </div>
    <span>{text}</span>
  </div>
);

// ─── Password Strength Calculator ────────────────────────────────────────────
const calcPasswordStrength = (pw) => {
  const checks = {
    length:    pw.length >= 8,
    uppercase: /[A-Z]/.test(pw),
    lowercase: /[a-z]/.test(pw),
    number:    /[0-9]/.test(pw),
    symbol:    /[^A-Za-z0-9]/.test(pw),
  };
  const score = Object.values(checks).filter(Boolean).length;
  let level = "empty";
  if (pw.length === 0) level = "empty";
  else if (score <= 2)  level = "weak";
  else if (score === 3) level = "fair";
  else if (score === 4) level = "good";
  else                  level = "strong";
  return { checks, score, level };
};

const strengthConfig = {
  empty:  { label: "",        bars: 0, color: "bg-slate-200 dark:bg-white/10",  text: "" },
  weak:   { label: "Weak",   bars: 1, color: "bg-rose-500",   text: "text-rose-400" },
  fair:   { label: "Fair",   bars: 2, color: "bg-amber-400",  text: "text-amber-400" },
  good:   { label: "Good",   bars: 3, color: "bg-blue-400",   text: "text-blue-400" },
  strong: { label: "Strong", bars: 4, color: "bg-emerald-400",text: "text-emerald-400" },
};

// ─── Requirement Row ─────────────────────────────────────────────────────────
const Req = ({ met, text }) => (
  <div className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors ${met ? "text-emerald-400" : "text-slate-400 dark:text-white/30"}`}>
    <span className="material-symbols-outlined text-[14px]">{met ? "check_circle" : "radio_button_unchecked"}</span>
    {text}
  </div>
);

// ─── Input Field Component ────────────────────────────────────────────────────
const InputField = ({ label, type = "text", value, onChange, placeholder, required, error, inputClassName = "", children }) => (
  <div className="space-y-1.5">
    <label className="text-[11px] uppercase tracking-wider font-bold text-slate-600 dark:text-white/60">{label}{required && " *"}</label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full bg-slate-50 dark:bg-[#1c1d22]/50 border rounded-xl px-4 py-3 text-[14px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20 focus:outline-none transition-all ${inputClassName} ${
          error
            ? "border-rose-500/60 focus:border-rose-500"
            : "border-slate-200 dark:border-white/8 focus:border-violet-500/60"
        }`}
      />
      {children}
    </div>
    {error && <p className="text-[11px] text-rose-400 font-medium">{error}</p>}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const SignUpPage = () => {
  const [fields, setFields] = useState({
    firstName: "", lastName: "", username: "", email: "", password: "", confirmPassword: "",
  });
  const [show, setShow] = useState({ password: false, confirm: false });
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const set = (key) => (e) => {
    const val = key === "username" ? e.target.value.replace(/\s/g, "") : e.target.value;
    setFields((f) => ({ ...f, [key]: val }));
    
    // Clear error for the active field
    if (fieldErrors[key]) setFieldErrors((fe) => ({ ...fe, [key]: "" }));
    
    // Logical Fix: If the main password changes, the confirm password error should also reset
    if (key === "password" && fieldErrors.confirmPassword) {
      setFieldErrors((fe) => ({ ...fe, confirmPassword: "" }));
    }
  };

  // Compute strength in real-time
  const strength = useMemo(() => calcPasswordStrength(fields.password), [fields.password]);
  const sc = strengthConfig[strength.level];

  // Validate before submit
  const validate = () => {
    const errors = {};
    if (!fields.firstName.trim()) errors.firstName = "First name is required.";
    if (!fields.lastName.trim()) errors.lastName = "Last name is required.";
    if (!fields.username.trim()) errors.username = "Username is required.";
    else if (fields.username.length < 3) errors.username = "Minimum 3 characters.";
    else if (!/^[a-zA-Z0-9_]+$/.test(fields.username)) errors.username = "Letters, numbers and _ only.";
    if (!fields.email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = "Enter a valid email address.";
    if (!fields.password) errors.password = "Password is required.";
    else if (strength.level === "weak" || strength.level === "empty" || strength.score < 4) errors.password = "Password is too weak. Meet all requirements.";
    if (!fields.confirmPassword) errors.confirmPassword = "Please confirm your password.";
    else if (fields.password !== fields.confirmPassword) errors.confirmPassword = "Passwords do not match.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setLoading(true);
    try {
      const result = await register(
        fields.firstName.trim(), fields.lastName.trim(),
        fields.username.trim(), fields.email.trim(), fields.password
      );
      if (result.success) {
        router.push(`/signin?message=${encodeURIComponent("Account created successfully! Please sign in to continue.")}&email=${encodeURIComponent(fields.email.trim())}`);
      } else {
        setServerError(result.error || "Registration failed. Please try again.");
      }
    } catch {
      setServerError("Could not connect to server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const leftContent = (
    <div className="flex flex-col h-full">
      <div>
        <Link href="/" className="inline-block mb-8 -ml-2">
          <img src={logo.src} alt="Aspirev" className="h-16 md:h-20 w-auto object-contain invert dark:invert-0" />
        </Link>
        <div className="max-w-lg">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-8">
            Start your <br />journey to the <br />career you <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cdbdff] to-[#00daf3]">deserve.</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-white/60 leading-relaxed mb-12">
            Join thousands of students already conquering their career path with Aspirev.
          </p>
          <div className="space-y-5">
            <FeatureItem text="Personalized Career Roadmaps" />
            <FeatureItem text="AI-Powered Job Application Tracker" />
            <FeatureItem text="Skill Gap & Resume Intelligence" />
          </div>
        </div>
      </div>
      <div className="text-[0.65rem] tracking-[0.2em] font-black text-slate-400 dark:text-white/30 uppercase mt-auto pt-12">
        © 2026 ASPIREV. CONQUER YOUR CAREER.
      </div>
    </div>
  );

  return (
    <AuthLayout leftContent={leftContent}>
      <div className="w-full">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">Create your account</h2>
        <p className="text-sm text-slate-500 dark:text-white/50 mb-7">Free forever. No credit card required.</p>

        {/* Social Auth */}
        <div className="grid grid-cols-2 gap-3 mb-7">
          <button type="button" className="flex items-center justify-center py-2.5 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-sm font-semibold text-slate-900 dark:text-white">
            <GoogleIcon />Google
          </button>
          <button type="button" className="flex items-center justify-center py-2.5 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-sm font-semibold text-slate-900 dark:text-white">
            <GitHubIcon />GitHub
          </button>
        </div>

        <div className="relative flex items-center mb-7">
          <div className="flex-grow border-t border-slate-200 dark:border-white/5" />
          <span className="flex-shrink-0 mx-4 text-[10px] uppercase tracking-widest font-black text-slate-400 dark:text-white/30">Or continue with email</span>
          <div className="flex-grow border-t border-slate-200 dark:border-white/5" />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {/* First Name + Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <InputField label="First Name" value={fields.firstName} onChange={set("firstName")} placeholder="John" required error={fieldErrors.firstName} />
            <InputField label="Last Name" value={fields.lastName} onChange={set("lastName")} placeholder="Carter" required error={fieldErrors.lastName} />
          </div>

          {/* Username */}
          <InputField label="Username" value={fields.username} onChange={set("username")} placeholder="john_carter" required error={fieldErrors.username} inputClassName="pl-8">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30 text-[14px] pointer-events-none select-none font-medium">@</span>
          </InputField>

          {/* Email */}
          <InputField label="Email Address" type="email" value={fields.email} onChange={set("email")} placeholder="john@example.com" required error={fieldErrors.email} />

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider font-bold text-slate-600 dark:text-white/60">Password *</label>
            <div className="relative">
              <input
                type={show.password ? "text" : "password"}
                value={fields.password}
                onChange={set("password")}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                placeholder="Min. 8 characters"
                required
                className={`w-full bg-slate-50 dark:bg-[#1c1d22]/50 border rounded-xl px-4 pr-12 py-3 text-[14px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all font-mono ${fieldErrors.password ? "border-rose-500/60 focus:border-rose-500" : "border-slate-200 dark:border-white/8 focus:border-violet-500/60"}`}
              />
              <button type="button" onClick={() => setShow((s) => ({ ...s, password: !s.password }))} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30 hover:text-slate-600 dark:hover:text-white/70 transition-colors p-1">
                <EyeIcon off={!show.password} className="w-4 h-4" />
              </button>
            </div>

            {/* Strength Meter — shown when typing */}
            {fields.password.length > 0 && (
              <div className="space-y-2 pt-1">
                {/* Bars */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3, 4].map((bar) => (
                      <div
                        key={bar}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${bar <= sc.bars ? sc.color : "bg-slate-200 dark:bg-white/10"}`}
                      />
                    ))}
                  </div>
                  {sc.label && (
                    <span className={`text-[11px] font-bold shrink-0 transition-colors ${sc.text}`}>{sc.label}</span>
                  )}
                </div>

                {/* Requirements checklist — shown on focus or if password exists */}
                {(passwordFocused || strength.level !== "strong") && (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 bg-slate-100/50 dark:bg-[#1c1d22] rounded-[14px] p-3.5 border border-slate-200/60 dark:border-white/10 mt-3 shadow-sm">
                    <Req met={strength.checks.length}    text="8+ characters" />
                    <Req met={strength.checks.uppercase} text="Uppercase (A-Z)" />
                    <Req met={strength.checks.lowercase} text="Lowercase (a-z)" />
                    <Req met={strength.checks.number}    text="Number (0-9)" />
                    <Req met={strength.checks.symbol}    text="Symbol (!@#...)" />
                  </div>
                )}

                {/* All good banner */}
                {strength.level === "strong" && !passwordFocused && (
                  <div className="flex items-center gap-2 text-emerald-400 text-[12px] font-semibold">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    Password meets all requirements
                  </div>
                )}
              </div>
            )}

            {fieldErrors.password && <p className="text-[11px] text-rose-400 font-medium pt-0.5">{fieldErrors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider font-bold text-slate-600 dark:text-white/60">Confirm Password *</label>
            <div className="relative">
              <input
                type={show.confirm ? "text" : "password"}
                value={fields.confirmPassword}
                onChange={set("confirmPassword")}
                placeholder="Re-enter your password"
                required
                className={`w-full bg-slate-50 dark:bg-[#1c1d22]/50 border rounded-xl px-4 pr-[70px] py-3 text-[14px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all font-mono ${
                  fieldErrors.confirmPassword ? "border-rose-500/60" :
                  fields.confirmPassword && fields.password === fields.confirmPassword ? "border-emerald-500/60" :
                  "border-slate-200 dark:border-white/8 focus:border-violet-500/60"
                }`}
              />
              {/* Match indicator (Only show red cross IF there is an actual submission error, don't punish them while typing!) */}
              {(fields.password === fields.confirmPassword && fields.confirmPassword.length > 0) ? (
                <div className="absolute right-[44px] top-1/2 -translate-y-1/2 text-emerald-400 transition-all">
                  <CheckIcon className="w-[16px] h-[16px]" />
                </div>
              ) : fieldErrors.confirmPassword ? (
                <div className="absolute right-[44px] top-1/2 -translate-y-1/2 text-rose-400 transition-all">
                  <CrossIcon className="w-[14px] h-[14px]" />
                </div>
              ) : null}
              {/* Divider */}
              <div className="absolute right-9 top-1/2 -translate-y-1/2 w-px h-5 bg-slate-200 dark:bg-white/10" />
              {/* Eye Button */}
              <button type="button" onClick={() => setShow((s) => ({ ...s, confirm: !s.confirm }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30 hover:text-slate-600 dark:hover:text-white/70 transition-colors p-1">
                <EyeIcon off={!show.confirm} className="w-4 h-4" />
              </button>
            </div>
            {fieldErrors.confirmPassword && <p className="text-[11px] text-rose-400 font-medium">{fieldErrors.confirmPassword}</p>}
          </div>

          {/* Server Error */}
          {serverError && (
            <div className="flex items-start gap-2.5 bg-rose-500/8 border border-rose-500/20 rounded-xl px-4 py-3">
              <span className="material-symbols-outlined text-rose-400 text-[18px] shrink-0 mt-0.5">error</span>
              <p className="text-xs text-rose-400 font-medium leading-relaxed">{serverError}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#814df3] to-[#5d21df] text-white font-bold text-sm hover:shadow-[0_0_25px_rgba(93,33,223,0.4)] transition-all mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating Account...</>
            ) : "Create Free Account →"}
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-sm text-slate-500 dark:text-white/50">
            Already have an account?{" "}
            <Link href="/signin" className="text-slate-900 dark:text-white font-bold hover:text-violet-400 transition-colors">Sign In</Link>
          </p>
        </div>
        <div className="mt-6 text-center">
          <p className="text-[10px] text-slate-400 dark:text-white/30 leading-relaxed max-w-xs mx-auto">
            By joining, you agree to our <a href="#" className="underline hover:text-slate-500">Terms of Service</a> and <a href="#" className="underline hover:text-slate-500">Privacy Policy</a>. We prioritize your data ethics.
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
