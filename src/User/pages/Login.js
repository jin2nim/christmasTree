import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/main.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');
  const navigate = useNavigate();

  const loadUserData = () => {
    if (!localStorage.getItem('users')) {
      //add json file or just add []
      localStorage.setItem('users', JSON.stringify([])); 
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleLogin = () => {
    const storedUserData = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUserData.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setAlertClass('alert alert-success');
      setMessage('Login Success!');
      localStorage.setItem('loggedInUser', JSON.stringify(user)); // 수정: 사용자 정보를 객체로 저장

      if(user.admin) {
        navigate("/admin");
      } else {
        navigate("/");
      }

      onLogin(user.id);
      navigate("/"); 
    } else {
      setAlertClass('alert alert-danger');
      setMessage('Login Fail');
    }
};

  return (
    <div className="loginForm">
      <div className="d-flex mx-auto mt-5 t-box d-lg-none" style={{ justifyContent: 'center', alignItems: 'center'}}>
      {/* <img src="/santa.png"/>
      <h1 className="head-t">Christmas Playlist</h1> */}
      </div>
      <h2>User login</h2>
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