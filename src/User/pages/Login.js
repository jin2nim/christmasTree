import React, { useState } from "react";  
import { useNavigate } from "react-router-dom";  
import "../css/main.css";  
  
const Login = ({ onLogin }) => {  
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");  
  const [message, setMessage] = useState("");  
  const [alertClass, setAlertClass] = useState("");  
  const navigate = useNavigate();  
  
  const logAuditAction = async (userID, email, loginStatus) => {  
   try {  
    console.log("Logging audit action...");  
    console.log("userID:", userID);  
    console.log("email:", email);  
  
    const response = await fetch(  
      "http://localhost:8080/web-dev-study/Final_Project/Back-end/auditLogAll.php",  
      {  
       method: "POST",  
       headers: {  
        "Content-Type": "application/json",  
       },  
       body: JSON.stringify({  
        userID,  
        email,  
        ip_address: "localhost",  
        action: "login_attempt",  
        message: loginStatus === "success" ? "User login successful" : "User login failed",  
       }),  
      }  
    );  
  
    const result = await response.json();  
    console.log("Audit log response:", result);  
   } catch (error) {  
    console.error("Error logging audit action:", error);  
   }  
  };  
  
  const handleLogin = async () => {  
   try {  
    const response = await fetch("http://localhost:8080/web-dev-study/Final_Project/Back-end/Login.php", {  
      method: "POST",  
      headers: {  
       "Content-Type": "application/json",  
      },  
      body: JSON.stringify({ email, password }),  
    });  
  
    const text = await response.text();  
    const result = JSON.parse(text);  
  
    if (result.status === "success") {  
      setAlertClass("alert alert-success");  
      setMessage("Login Success!");  
      sessionStorage.setItem("loggedInUser", JSON.stringify(result.user));  
      onLogin(result.user.id, result.user.role);  
  
      // Record Audit Log
      await logAuditAction(result.user?.id, result.user?.email, "success");  
  
      // move pages
      if (result.user.role === "admin") {  
       navigate("/userList");  
      } else {  
       navigate("/");  
      }  
    } else {  
      setAlertClass("alert alert-danger");  
      setMessage(result.message || "Login failed.");  
      await logAuditAction(null, email, "failed");  
    }  
   } catch (error) {  
    setAlertClass("alert alert-danger");  
    setMessage("An unexpected error occurred.");  
    console.error("Error:", error);  
   }  
  };  
  
  return (  
   <div className="loginForm">  
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
    <button className="mt-5 btn btn-primary" onClick={handleLogin}>  
      Login  
    </button>  
    {message && (  
      <div className={alertClass} role="alert">  
       {message}  
      </div>  
    )}  
   </div>  
  );  
};  
  
export default Login;
