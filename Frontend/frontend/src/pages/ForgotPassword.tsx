import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    alert("Password reset link sent to your email");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-md text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Forgot Password
        </h1>

        <p className="text-gray-300 text-center mb-6">
          Enter your registered email to
          receive a password reset link.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border border-gray-500 bg-transparent p-4 rounded-xl mb-5 outline-none"
        />

        <button
          onClick={handleResetPassword}
          className="w-full bg-red-500 hover:bg-red-600 transition text-white p-4 rounded-xl font-semibold shadow-lg"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;