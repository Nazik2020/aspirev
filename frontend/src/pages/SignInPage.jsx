import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import logo from "../assets/bg_removed_logo.png";
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

// ─── Input Field Component ────────────────────────────────────────────────────
const InputField = ({ label, type = "text", value, onChange, placeholder, required, error, children }) => (
  <div className="space-y-1.5">
    <label className="text-[11px] uppercase tracking-wider font-bold text-slate-600 dark:text-white/60">{label}{required && " *"}</label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full bg-slate-50 dark:bg-[#1c1d22]/50 border rounded-xl px-4 py-3 text-[14px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20 focus:outline-none transition-all ${
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

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate  = useNavigate();
  const location  = useLocation();
  const [successMessage, setSuccessMessage] = useState(location.state?.message || "");
  const [email, setEmail]       = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading]   = useState(false);
  const { login } = useAuth();

  const validate = () => {
    const errors = {};
    if (!email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
    
    if (!password) errors.password = "Password is required.";
    
    return errors;
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    setServerError("");
    setFieldErrors({});

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const result = await login(email.trim(), password, rememberMe);
      if (result.success) {
        // Admin users go to admin dashboard, regular users to dashboard
        if (result.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        setServerError(result.error || "Login failed. Please try again.");
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
        <Link to="/" className="inline-block mb-8 -ml-2">
          <img src={logo} alt="Invikt" className="h-9 md:h-11 w-auto object-contain" />
        </Link>
        <div className="max-w-lg">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-8">
            Welcome back.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cdbdff] to-[#00daf3]">
              Your career path
            </span>
            <br />
            awaits.
          </h1>
          <p className="text-lg text-slate-600 dark:text-white/60 leading-relaxed mb-12">
            Pick up exactly where you left off. Your roadmap, applications, and progress are all here waiting for you.
          </p>

          <div className="w-full bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full"></div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] uppercase tracking-widest font-black text-slate-900 dark:text-[#cdbdff]">Current Goal</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-white/40">5/12 skills</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Frontend Developer</h3>
            <div className="w-full h-2 bg-slate-100 dark:bg-white/5 rounded-full mb-8 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#cdbdff] to-[#00daf3] w-[42%] rounded-full"></div>
            </div>
            <div className="space-y-3">
              <div className="bg-white dark:bg-[#1c1d22] rounded-2xl p-4 flex items-center border border-slate-200 dark:border-white/5">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mr-4 shrink-0">
                  <span className="material-symbols-outlined text-[18px] text-slate-700 dark:text-white/80">search</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">Google</div>
                  <div className="text-xs text-slate-500 dark:text-white/40">Senior Engineer</div>
                </div>
                <div className="px-3 py-1 rounded-full bg-slate-50 dark:bg-[#00daf3]/10 text-slate-900 dark:text-[#00daf3] text-[10px] font-bold tracking-wide">INTERVIEW</div>
              </div>
              <div className="bg-white dark:bg-[#1c1d22] rounded-2xl p-4 flex items-center border border-slate-200 dark:border-white/5">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mr-4 shrink-0">
                  <span className="material-symbols-outlined text-[18px] text-slate-700 dark:text-white/80">payments</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">Stripe</div>
                  <div className="text-xs text-slate-500 dark:text-white/40">Product Designer</div>
                </div>
                <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 text-[10px] font-bold tracking-wide">APPLIED</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-[0.65rem] tracking-[0.2em] font-black text-slate-400 dark:text-white/30 uppercase mt-auto pt-12">
        © 2026 INVIKT. CONQUER YOUR CAREER.
      </div>
    </div>
  );

  return (
    <AuthLayout leftContent={leftContent}>
      <div className="w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-1.5 tracking-tight">
            Sign in to Invikt
          </h2>
          <p className="text-sm text-slate-500 dark:text-white/50">
            Continue conquering your career.
          </p>
        </div>

        {/* Success Message from Sign Up */}
        {successMessage && (
          <div className="mb-6 flex items-center gap-2.5 bg-emerald-500/10 dark:bg-[#1c1d22] border border-emerald-500/30 dark:border-emerald-500/20 rounded-xl px-4 py-3.5 shadow-sm">
            <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[20px] shrink-0">check_circle</span>
            <p className="text-[13px] text-slate-900 dark:text-white font-semibold leading-snug">{successMessage}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button type="button" className="flex items-center justify-center py-2.5 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-sm font-semibold text-slate-900 dark:text-white">
            <GoogleIcon />Google
          </button>
          <button type="button" className="flex items-center justify-center py-2.5 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-sm font-semibold text-slate-900 dark:text-white">
            <GitHubIcon />GitHub
          </button>
        </div>

        <div className="relative flex items-center mb-6">
          <div className="flex-grow border-t border-slate-200 dark:border-white/5"></div>
          <span className="flex-shrink-0 mx-4 text-[10px] uppercase tracking-widest font-black text-slate-400 dark:text-white/30">
            Or continue with email
          </span>
          <div className="flex-grow border-t border-slate-200 dark:border-white/5"></div>
        </div>

        <form className="space-y-4" onSubmit={handleSignIn} noValidate>
          
          <InputField 
            label="Email Address" 
            type="email" 
            value={email} 
            onChange={(e) => {
              setEmail(e.target.value);
              if (fieldErrors.email) setFieldErrors(prev => ({...prev, email: ""}))
            }} 
            placeholder="name@company.com" 
            required 
            error={fieldErrors.email} 
          />

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[11px] uppercase tracking-wider font-bold text-slate-600 dark:text-white/60">
                Password *
              </label>
              <Link to="/forgot-password" className="text-[11px] font-bold text-slate-600 dark:text-white/60 hover:text-slate-900 dark:text-white transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors(prev => ({...prev, password: ""}))
                }}
                placeholder="••••••••"
                required
                className={`w-full bg-slate-50 dark:bg-[#1c1d22]/50 border rounded-xl px-4 py-3 pr-12 text-[14px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all font-mono ${fieldErrors.password ? "border-rose-500/60 focus:border-rose-500" : "border-slate-200 dark:border-white/8 focus:border-violet-500/60"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30 hover:text-slate-600 dark:hover:text-white/70 transition-colors p-1"
              >
                <EyeIcon off={!showPassword} className="w-4 h-4" />
              </button>
            </div>
            {fieldErrors.password && <p className="text-[11px] text-rose-400 font-medium">{fieldErrors.password}</p>}
          </div>

          <div className="flex items-center justify-between pt-1 pb-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="appearance-none w-4 h-4 border border-slate-300 dark:border-white/20 rounded-md checked:bg-violet-500 checked:border-violet-500 transition-colors cursor-pointer group-hover:border-violet-400"
                />
                {rememberMe && (
                  <svg className="absolute w-2.5 h-2.5 text-white pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className="text-[13px] font-medium text-slate-600 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white/90 transition-colors">
                Remember me
              </span>
            </label>
          </div>

          {/* Server Error Message */}
          {serverError && (
            <div className="flex items-start gap-2.5 bg-rose-500/8 border border-rose-500/20 rounded-xl px-4 py-3">
              <span className="material-symbols-outlined text-rose-400 text-[18px] shrink-0 mt-0.5">error</span>
              <p className="text-xs text-rose-400 font-medium leading-relaxed">{serverError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#814df3] to-[#5d21df] text-white font-bold text-sm hover:shadow-[0_0_25px_rgba(93,33,223,0.4)] transition-all mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Signing In...
              </>
            ) : (
              "Sign In →"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-white/50">
            Don't have an account?{" "}
            <Link to="/signup" className="text-slate-900 dark:text-white font-bold hover:text-violet-400 transition-colors">
              Sign Up Free
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignInPage;
