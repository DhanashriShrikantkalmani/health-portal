// src/Login.jsx
import { useState } from "react";

const USERS_KEY = "hp_users_v1"; // where registered users are stored

function Login({ onLogin, onShowSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
debugger;

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    // check localStorage users (demo)
    const raw = localStorage.getItem(USERS_KEY);
    const users = raw ? JSON.parse(raw) : [];

    const found = users.find(u => u.username === username && u.password === password);

    // allow a built-in demo admin as fallback
    if (found || (username === "admin" && password === "1234")) {
      onLogin(username);
    } else {
      alert("Invalid credentials. (Hint: try admin / 1234 or create an account via Signup.)");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Login</h1>

      <div>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
      </div>

      <div style={{ marginTop: 8 }}>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>

      <div style={{ marginTop: 8 }}>
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />{" "}
          Show password
        </label>
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={handleLogin}>Login</button>
        <button onClick={onShowSignup} style={{ marginLeft: 8 }}>
          Signup
        </button>
      </div>

      <p style={{ marginTop: 12, color: "#555" }}>
        Demo tip: you can use <strong>admin / 1234</strong> or create a new account.
      </p>
    </div>
  );
}

export default Login;
