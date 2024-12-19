import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", name: "", password: "" });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/web-dev-study/Final_Project/Back-end/Register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // PHP 응답이 비어있는 경우 대비
      const text = await response.text();
      console.log("Raw Response:", text);

      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        throw new Error("Invalid JSON response from server");
      }

      if (result.status === "success") {
        setMessage("Registration successful!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="regForm">
      <div className="d-flex mx-auto mt-5 d-lg-none" style={{ justifyContent: 'center', alignItems: 'center' }}>
        {/* <img src="/santa.png"/>
      <h1 className="head-t">Christmas Playlist</h1> */}
      </div>
      <h2>Set User Information</h2>
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