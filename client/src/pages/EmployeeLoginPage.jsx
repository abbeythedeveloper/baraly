import { useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets/assets.js";

const EmployeeLoginPage = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Graphic Designer");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Employee Login:", { email, role, password });
  };

  // const handleGoogleSignIn = () => {
  //   console.log("Google employee sign in");
  // };

  return (
    <div className="min-h-screen bg-[#F3FFFB] flex flex-col items-center pt-20 px-6 pb-12">
      {/* Logo */}
      <div className="flex flex-col items-center space-y-4 mb-10">
        <img src={logo} alt="Logo" className="w-16 h-16" />

        <h1 className="text-[22px] font-semibold text-black text-center">
          Employee Portal
        </h1>

        <p className="text-[14px] text-black/70 text-center">
          Baraly Project Hub • Administrator Access
        </p>

        <Link
          to="/auth/login"
          className="text-[13px] text-black/60 hover:text-black underline transition"
        >
          ← Back to Client Login
        </Link>
      </div>

      {/* Auth Card */}
      <div className="bg-white w-full max-w-[420px] rounded-[20px] p-7 shadow-sm space-y-6">
        <div>
          <h2 className="text-[20px] font-semibold text-black">Sign In</h2>
          <p className="text-[14px] text-black/70">
            Enter your credentials to access the portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-[13px] font-medium text-black mb-2">
              Emails
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 10 7 10-7" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="employee@baraly.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 pl-12 pr-4 border border-[#E5E5E5] rounded-lg text-[14px] placeholder:text-gray-400 focus:ring-2 focus:ring-[#87A29C] focus:border-transparent focus:outline-none transition"
                required
              />
            </div>
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-[13px] font-medium text-black mb-2">
              Role
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 20c0-3.3137 2.6863-6 6-6s6 2.6863 6 6" />
                </svg>
              </div>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-12 pl-12 pr-4 border border-[#E5E5E5] rounded-lg bg-white text-[14px] text-black/70 focus:ring-2 focus:ring-[#87A29C] focus:outline-none transition"
              >
                <option>Graphic Designer</option>
                <option>Project Manager</option>
                <option>Social Media Manager</option>
                <option>Content Strategist</option>
                <option>Operations Supervisor</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[13px] font-medium text-black mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 pl-12 pr-4 border border-[#E5E5E5] rounded-lg text-[14px] placeholder:text-gray-400 focus:ring-2 focus:ring-[#87A29C] focus:outline-none transition"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-12 bg-[#13BF9E] hover:bg-[#27f1b1] text-white rounded-lg font-semibold text-[15px] transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        {/* <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5E5E5]"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-white text-[11px] text-black/40 tracking-wider">
              OR CONTINUE WITH
            </span>
          </div>
        </div> */}

        {/* Google Sign-In */}
        {/* <button
          onClick={handleGoogleSignIn}
          className="w-full h-12 bg-white border border-[#E5E5E5] rounded-lg font-medium text-[14px] text-black hover:bg-gray-50 transition flex items-center justify-center gap-3"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M19.8055 10.2292C19.8055 9.55156 19.7501 8.86719 19.6323 8.19531H10.2002V12.0492H15.6014C15.3734 13.2911 14.6571 14.3898 13.6177 15.0875V17.5867H16.8249C18.7175 15.8445 19.8055 13.2727 19.8055 10.2292Z"
              fill="#4285F4"
            />
            <path
              d="M10.2002 20.0008C12.9515 20.0008 15.2708 19.1056 16.8295 17.5867L13.6223 15.0875C12.7362 15.6979 11.5865 16.0437 10.2047 16.0437C7.5463 16.0437 5.28947 14.2828 4.51763 11.9102H1.2168V14.4819C2.81531 17.6555 6.34277 20.0008 10.2002 20.0008Z"
              fill="#34A853"
            />
            <path
              d="M4.51312 11.9102C4.06312 10.6683 4.06312 9.33547 4.51312 8.09359V5.52188H1.21762C-0.164062 8.16719 -0.164062 11.836 1.21762 14.4812L4.51312 11.9102Z"
              fill="#FBBC04"
            />
            <path
              d="M10.2002 3.95781C11.6643 3.93594 13.0784 4.47188 14.1455 5.46875L17.0178 2.60156C15.1806 0.904687 12.7362 -0.0210938 10.2002 0.000781252C6.34277 0.000781252 2.81531 2.34609 1.2168 5.52187L4.51231 8.09359C5.27947 5.71484 7.5363 3.95781 10.2002 3.95781Z"
              fill="#EA4335"
            />
          </svg>
          Sign in with Google
        </button> */}
      </div>
    </div>
  );
};

export default EmployeeLoginPage;
