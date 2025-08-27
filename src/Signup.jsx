// src/Signup.jsx
import { useState } from "react";

const USERS_KEY = "hp_users_v1"; // same key used by Login

function Signup({ onSignupSuccess, onShowLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!username || !password) {
      alert("Please choose username and password");
      return;
    }

    const raw = localStorage.getItem(USERS_KEY);
    const users = raw ? JSON.parse(raw) : [];

    // simple uniqueness check
    if (users.find(u => u.username === username)) {
      alert("Username already exists. Pick another.");
      return;
    }

    users.push({ username, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    alert("Account created. Please login.");
    onSignupSuccess();
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Signup</h1>

      <div>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose username"
        />
      </div>

      <div style={{ marginTop: 8 }}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Choose password"
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={handleSignup}>Signup</button>
        <button onClick={onShowLogin} style={{ marginLeft: 8 }}>
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default Signup;
