import React, { useState } from "react";

function LoginSignup({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State to hold the list of users
  const [users, setUsers] = useState([
    { email: "user1@example.com", password: "password1" },
    { email: "user2@example.com", password: "password2" },
    { email: "user3@example.com", password: "password3" },
  ]);

  const handleAuth = (e) => {
    e.preventDefault();

    if (isLogin) {
      // Login logic
      const validUser = users.find(
        (user) => user.email === email && user.password === password
      );
      if (validUser) {
        onAuth(true);
      } else {
        alert("Invalid credentials");
      }
    } else {
      // Signup logic
      const existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        alert("User already exists! Please log in.");
      } else {
        const newUser = { email, password };
        setUsers([...users, newUser]);
        alert("User registered successfully! Please log in.");
        setIsLogin(true); // Redirect to login after signup
      }
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
      <div
        style={{
          width: "300px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleAuth}>
          <div style={{ marginBottom: "15px" }}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p
          style={{ marginTop: "10px", cursor: "pointer", color: "blue" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default LoginSignup;
