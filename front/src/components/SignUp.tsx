import React, { useState } from 'react';

interface SignUpProps {
  onSignupSuccess: (name: string) => void;
}

const SignUp = ({ onSignupSuccess }: SignUpProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    const newUser = { fullName: fullName.trim(), email: cleanEmail, password };

    // 1. Retrieve existing database
    const existingUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");

    // 2. Check for duplicates
    if (existingUsers.some((u: any) => u.email === cleanEmail)) {
      alert("User with this email already exists!");
      return;
    }

    // 3. Save to database array
    existingUsers.push(newUser);
    localStorage.setItem("allUsers", JSON.stringify(existingUsers));

    // 4. Create active session
    localStorage.setItem("schoolTripUser", JSON.stringify(newUser));

    // 5. Tell Header we are logged in
    onSignupSuccess(newUser.fullName);
  };


  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input 
          type="text" 
          placeholder="Full Name"
          value={fullName}
          className="p-3 border rounded-xl w-full focus:ring-2 focus:ring-[#f37021] outline-none"
          onChange={(e) => setFullName(e.target.value)}
          required 
        />
        <input 
          type="email" 
          placeholder="Email"
          value={email}
          className="p-3 border rounded-xl w-full focus:ring-2 focus:ring-[#f37021] outline-none"
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          className="p-3 border rounded-xl w-full focus:ring-2 focus:ring-[#f37021] outline-none"
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        {/* IMPORTANT: Ensure type="submit" is on the button */}
        <button 
          type="submit" 
          className="bg-[#f37021] text-white py-3 rounded-full font-bold hover:bg-[#d65d1a] transition-all cursor-pointer"
        >
          Register Now
        </button>
      </form>
    </div>
  );
};

export default SignUp;