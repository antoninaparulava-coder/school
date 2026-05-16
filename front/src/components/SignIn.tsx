import React, { useState } from 'react';

interface SignInProps {
  onLoginSuccess: (name: string) => void;
}

const SignIn = ({ onLoginSuccess }: SignInProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 1. Get users from localStorage
    const users = JSON.parse(localStorage.getItem("allUsers") || "[]");
    const cleanInputEmail = email.trim().toLowerCase();

    // 2. Find the user
    const foundUser = users.find((u: any) => 
      u.email.toLowerCase() === cleanInputEmail && u.password === password
    );

    if (foundUser) {
      // 3. Save session and trigger success
      localStorage.setItem("schoolTripUser", JSON.stringify(foundUser));
      onLoginSuccess(foundUser.fullName); // Pass the actual name from the DB
    } else {
      setError("Incorrect email or password!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">Sign In</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input 
        type="email" 
        placeholder="Email" 
        className="p-3 border rounded-xl"
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        className="p-3 border rounded-xl"
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit" className="bg-[#f37021] text-white py-3 rounded-full font-bold">
        Login
      </button>
    </form>
  );
};

export default SignIn;