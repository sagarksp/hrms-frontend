// components/ClientLogin.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../../config/config";

const ClientLogin = () => {
  const [loading, setLoading] = useState(false); // Manage loading state
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [email, setEmail] = useState(""); // Manage email state
  const [password, setPassword] = useState(""); // Manage password state
  const [rememberMe, setRememberMe] = useState(false); // Manage remember me state

  const router = useRouter();

  // Load saved credentials from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedRememberMe) {
      setEmail(savedEmail || "");
      setPassword(savedPassword || "");
      setRememberMe(savedRememberMe);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/hrms/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const result = await response.json();
      const { message: msg, error } = result;

      if (msg === "success") {
        // Save credentials if remember me is checked
        if (rememberMe) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          localStorage.setItem("rememberMe", true);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
          localStorage.removeItem("rememberMe");
        }
        toast.success("Login successful");
        document.location.href = "/employee/dashboard";
      } else if (error) {
        const details = error?.details?.[0]?.message || "An error occurred";
        toast.error(details);
      } else {
        toast.error(msg);
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-white p-6 rounded shadow-md w-full max-w-md">
        <Toaster />
        <h1 className="text-2xl text-orange-500 text-center font-bold">
          GIGANTIC
        </h1>
        <p className="text-center text-gray-600 mt-2">
        The world&#39;s largest code broadband platform.
      </p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-orange-200"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-orange-200"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-600 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-200"
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded ${
              loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ClientLogin;
