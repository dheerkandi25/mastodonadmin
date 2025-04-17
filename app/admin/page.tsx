"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:5000/app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_id: username, password: password }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      const accessToken = data.access_token;
      localStorage.setItem("adminAccessToken", accessToken);
      alert("Login successful!");

      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
    }
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage: "url('./images/bg.jpg')",
      }}
    >
      <div className="max-w-md w-full p-6 border border-black rounded-md bg-white bg-opacity-90 text-center">
        <h1 className="text-black text-2xl font-bold mb-6">Admin Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4 text-left">
            <label className="block text-black mb-2">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-black rounded-md text-black"
            />
          </div>
          <div className="mb-4 text-left">
            <label className="block text-black mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-black rounded-md text-black"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
