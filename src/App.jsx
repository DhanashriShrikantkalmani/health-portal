// src/App.jsx
import { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";

const STORAGE_KEY = "hp_auth_v1"; // session storage key

function App() {
  const [page, setPage] = useState("login"); // "login" | "signup" | "portal"
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // load saved session on first load
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const obj = JSON.parse(raw);
        if (obj?.isLoggedIn && obj?.username) {
          setUsername(obj.username);
          setIsLoggedIn(true);
          setPage("portal");
        }
      } catch (e) {
        // ignore parse errors
      }
    }
  }, []);

  // persist session whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ isLoggedIn, username }));
  }, [isLoggedIn, username]);

  // show login screen
  if (page === "login") {
    return (
      <Login
        onLogin={(user) => {
          setUsername(user);
          setIsLoggedIn(true);
          setPage("portal");
        }}
        onShowSignup={() => setPage("signup")}
      />
    );
  }

  // show signup screen
  if (page === "signup") {
    return (
      <Signup
        onSignupSuccess={() => setPage("login")}
        onShowLogin={() => setPage("login")}
      />
    );
  }

  // portal (after login)
  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Welcome, {username}</h1>
      <p>This is the Health Investigation Portal (demo).</p>

      <button
        onClick={() => {
          // logout: clear session and go back to login
          setIsLoggedIn(false);
          setUsername("");
          setPage("login");
          localStorage.removeItem(STORAGE_KEY);
        }}
      >
        Logout
      </button>

      <div style={{ marginTop: 20 }}>
        {/* placeholder for portal UI we'll add later */}
        <strong>Portal area:</strong>
        <div>— investigations UI will appear here later</div>
      </div>
    </div>
  );
}

export default App;
