import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", name: "", password: "" });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for required fields
    if (!formData.email || !formData.name || !formData.password) {
      setMessage('Please fill in all fields.');
      return;
    }

    // Check email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    // Check password length (minimum 6 characters)
    if (formData.password.length < 1) {
      setMessage('Password must be at least 1 characters long.');
      return;
    }

    // Get existing user data from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email already exists
    const emailExists = users.some(user => user.email === formData.email);
    
    if (emailExists) {
      setMessage('This email is already registered.');
      return;
    }

    // Add new user data
    const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1; // Increment based on the max ID
    const newUser = { id: newId, ...formData, admin: false };
    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Save updated user data to localStorage

    setMessage('Registration successful!');
    navigate('/login');  // Navigate to login page
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="regForm">
      <div className="d-flex mx-auto mt-5 d-lg-none" style={{ justifyContent: 'center', alignItems: 'center'}}>
      {/* <img src="/santa.png"/>
      <h1 className="head-t">Christmas Playlist</h1> */}
      </div>
      <h2>Set User Infomation</h2>
      <p>You can only <span className="red">set the username once</span></p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          className="form-control mb-2"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          className="form-control mb-2"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className="form-control mb-2"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className="mt-5">Register</button>
      </form>
      {message && <div className="alert alert-info">{message}</div>}
    </div>
  );
};

export default Register;
