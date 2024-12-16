import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/main.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost/Christmas_final/api/Login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();
      console.log("Raw Response:", text);

      const result = JSON.parse(text);
      if (result.status === "success") {
        setAlertClass("alert alert-success");
        setMessage("Login Success!");
        localStorage.setItem("loggedInUser", JSON.stringify(result.user));

        // pages by roles
        if (result.user.role === "admin") {
          navigate("/admin");
        } else if (result.user.role === "user") {
          navigate("/");
        } else {
          setMessage("Unknown role. Please contact support.");
        }

        onLogin(result.user.id);
      } else {
        setAlertClass("alert alert-danger");
        setMessage(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setAlertClass("alert alert-danger");
      setMessage("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="loginForm">
      <div className="d-flex mx-auto mt-5 t-box d-lg-none" style={{ justifyContent: "center", alignItems: "center" }}>
      </div>
      <h2>User Login</h2>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="mt-5" onClick={handleLogin}>Login</button>
      {message && (
        <div className={alertClass} role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default Login;
