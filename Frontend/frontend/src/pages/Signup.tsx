import { useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSignup = () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    alert("Account Created Successfully");

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-md text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Sign Up
        </h1>

        <p className="text-gray-300 text-center mb-6">
          Create your Smart Leads
          Dashboard account
        </p>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border border-gray-500 bg-transparent p-4 rounded-xl mb-4 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border border-gray-500 bg-transparent p-4 rounded-xl mb-4 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border border-gray-500 bg-transparent p-4 rounded-xl mb-6 outline-none"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-4 rounded-xl font-semibold shadow-lg"
        >
          Create Account
        </button>

        <p className="text-center text-gray-400 mt-6">
          MERN Stack Internship
          Assignment
        </p>
      </div>
    </div>
  );
}

export default Signup;