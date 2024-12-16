import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./User/pages/Home";
import Master from "./Common/Master";
import Login from "./User/pages/Login";
import NoPage from "./User/pages/NoPage";
import Logout from "./User/pages/Logout";
import Register from "./User/pages/Register";
import PlayHome from "./User/pages/playlist/PlayHome";
import Profile from "./User/pages/Profile";
import SnowEffect from "./User/components/SnowEffect";
// Admin
import UserList from "./Admin/pages/UserList";
import UserLogs from "./Admin/pages/UserLogs";
import EditItem from "./Admin/pages/EditItem";
import EditSong from "./Admin/pages/EditSongs";
import "./User/css/main.css";
import { useEffect, useState } from "react";

function App() {
  const [loggedInUserId, setLoggedInUserId] = useState(localStorage.getItem("loggedInUserId"));
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const loggedInUser = users.find(user => user.id === Number(loggedInUserId));

    if (loggedInUser) {
      setUserRole(loggedInUser.admin);  // Set the user role based on the logged-in user
    }
  }, [loggedInUserId]);

  const handleLogin = (userId) => {
    setLoggedInUserId(userId);
    localStorage.setItem("loggedInUserId", userId); // Store login
  };

  const handleLogout = () => {
    setLoggedInUserId(null);
    localStorage.removeItem("loggedInUserId"); // Delete login
  };

  return (
    <div className="wrap">
      <SnowEffect />
      <Router>
        <Routes>
          <Route path="/" element={<Master isLogin={loggedInUserId} userRole={userRole} />}>
            {loggedInUserId ? (
              <>
                 <Route index element={userRole ? <UserList /> : <Home />} />
                <Route path="play/*" element={<PlayHome />} />
                <Route path="profile" element={<Profile userId={loggedInUserId} />} />
                <Route path="logout" element={<Logout onLogout={handleLogout} />} />
                {userRole && (
                  <>
                    <Route path="userList" element={<UserList/>}/>
                    <Route path="userLog" element={<UserLogs/>}/>
                    <Route path="editItem" element={<EditItem/>}/>
                    <Route path="editSong" element={<EditSong/>}/>
                  </>
                )}
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
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
