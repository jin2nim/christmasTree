import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem('loggedInUserId');
    onLogout(null);
    navigate('/login');
  }, [onLogout, navigate]);

  return (
    <div>
      <h2>You have logged out</h2>
    </div>
  );
};

export default Logout;
