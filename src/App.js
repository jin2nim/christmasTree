import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Master from "./pages/Master";
import Login from "./pages/Login";
import Nopage from "./pages/Nopage";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import PlayHome from "./pages/playlist/PlayHome";
import Profile from "./pages/Profile";
import SnowEffect from "./components/SnowEffect";
import "./css/main.css";
import { useState } from "react";

function App() {
  const [loggedInUserId, setLoggedInUserId] = useState(localStorage.getItem("loggedInUserId"));

  const handleLogin = (userId) => {
    setLoggedInUserId(userId);
    localStorage.setItem("loggedInUserId", userId); // store login
  };

  const handleLogout = () => {
    setLoggedInUserId(null);
    localStorage.removeItem("loggedInUserId"); // delete
  };

  return (
    <div className="wrap">
      <SnowEffect />
      <Router>
        <Routes>
          <Route path="/" element={<Master isLogin={loggedInUserId} />}>
            {loggedInUserId ? (
              <>
                <Route index element={<Home />} />
                <Route path="play/*" element={<PlayHome />} />
                <Route path="profile" element={<Profile userId={loggedInUserId} />} />
                <Route path="logout" element={<Logout onLogout={handleLogout} />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="play/*" element={<Navigate to="/login" replace />} />
                <Route path="profile" element={<Navigate to="/login" replace />} />
                <Route path="login" element={<Login onLogin={handleLogin} />} />
                <Route path="register" element={<Register />} />
              </>
            )}
            <Route path="*" element={<Nopage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
