import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { FiLock, FiUser, FiArrowLeft, FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error("Please provide both username and password.");
      return;
    }

    setIsSubmitting(true);
    const result = await login(username.trim(), password);
    setIsSubmitting(false);

    if (result.success) {
      toast.success("Welcome back! Redirecting to CMS Dashboard...");
      navigate("/admin");
    } else {
      toast.error(result.message || "Invalid credentials.");
    }
  };

  const fillDemoCredentials = () => {
    setUsername("admin");
    setPassword("admin123");
    toast.info("Default credentials pre-filled!");
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top back button */}
      <div className="w-full max-w-md mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
        >
          <FiArrowLeft className="text-lg" /> Back to Live Portfolio
        </Link>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#0F172A]/90 border border-gray-800 rounded-2xl shadow-2xl backdrop-blur-xl p-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
            <MdAdminPanelSettings className="text-3xl text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            Admin CMS Login
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Authenticate to manage dynamic portfolio content, skills, services, and inquiries.
          </p>
        </div>

        {/* Demo Helper Banner */}
        <div
          onClick={fillDemoCredentials}
          className="cursor-pointer mb-6 p-3 rounded-xl bg-blue-950/40 border border-blue-800/50 hover:border-blue-500 transition-all flex items-center justify-between text-xs text-blue-300 group"
          title="Click to auto-fill"
        >
          <div className="flex items-center gap-2">
            <FiCheckCircle className="text-blue-400 text-sm" />
            <span>Default: <strong className="text-white">admin</strong> / <strong className="text-white">admin123</strong></span>
          </div>
          <span className="text-[11px] bg-blue-600/30 text-blue-200 px-2 py-0.5 rounded font-mono group-hover:bg-blue-500 group-hover:text-white transition">
            Auto-fill
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Username or Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                <FiUser className="text-lg" />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin or email"
                required
                className="w-full pl-11 pr-4 py-3 bg-[#1E293B]/80 border border-gray-700/80 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                <FiLock className="text-lg" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-11 pr-11 py-3 bg-[#1E293B]/80 border border-gray-700/80 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white transition"
              >
                {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-blue-600 hover:from-blue-500 to-indigo-600 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          Portfolio Content Management System • Deepanshu Srivastava
        </div>
      </div>
    </div>
  );
};

export default Login;
