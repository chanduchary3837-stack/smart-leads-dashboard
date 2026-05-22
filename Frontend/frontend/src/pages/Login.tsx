import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    localStorage.setItem(
      "token",
      "loggedin"
    );

    localStorage.setItem(
      "userEmail",
      email
    );

    alert("Login Successful");

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center text-white p-6">
      
      <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl">

        {/* Left Side */}
        <div className="flex flex-col justify-center">

          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Smart Leads Dashboard
          </h1>

          <p className="text-gray-300 text-lg leading-8 mb-6">
            Manage leads efficiently with authentication,
            search, filters, pagination, and export
            functionality.
          </p>

          <div className="space-y-4">

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
              ✅ Create & Manage Leads
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
              ✅ Search & Filter Leads
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
              ✅ CSV Export & Pagination
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
              ✅ Secure Authentication
            </div>

          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-3xl shadow-2xl">

          <h2 className="text-4xl font-bold mb-8 text-center">
            Login
          </h2>

          <div className="flex justify-between text-sm text-blue-400 mb-4">

            <Link
              to="/signup"
              className="hover:underline"
            >
              Sign Up
            </Link>

            <Link
              to="/forgotpassword"
              className="hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border border-gray-500 bg-transparent p-4 rounded-xl mb-5 outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border border-gray-500 bg-transparent p-4 rounded-xl mb-6 outline-none focus:border-blue-500"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 p-4 rounded-xl font-semibold text-lg shadow-lg"
          >
            Login
          </button>

          <p className="text-center text-gray-400 mt-6">
            Internship Assignment Project
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;