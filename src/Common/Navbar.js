import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../User/css/main.css";

export default function Navbar({ isLogin, userRole }) {
  const location = useLocation(); // To track the active route
  const isProfilePage = location.pathname === "../User/profile"; // Check if current page is profile

  // Close navbar if root is changed for mobile
  useEffect(() => {
    const navBarCollapse = document.getElementById("navbarNav");

    const closeNavbar = () => {
      // Close navbar only on mobile
      if (window.innerWidth < 992) {
        navBarCollapse.classList.remove("show");
      }
    };

    closeNavbar();
  }, [location]); // Re-render if location changes

  // Determine if the link is active or not at the time
  const currentDisplay = (path) => location.pathname === path;

  return (
    <div className="nav-wrap">
      <nav style={{ backgroundColor: isProfilePage ? "#d83f3f" : undefined }} className="navbar navbar-expand-lg nav-icon">
        <div className="current-page">
          <Link to="/" aria-current="page" className="page-title">
            <h1 className={`page-title ${isProfilePage ? "profile-title" : ""}`}>
              <img src={`${process.env.PUBLIC_URL}/santa.png`} alt="Santa Icon" />
              Christmas Playlist
            </h1>
          </Link>
        </div>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className={`navbar-toggler-icon ${isProfilePage ? "icon-white" : "icon-black"}`}></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <Link to="/" aria-current="page" className="page-title">
                <li className="nav-item d-none d-lg-block nav-t">
                  <img src={`${process.env.PUBLIC_URL}/santa.png`} alt="logo" />
                  Christmas Playlist
                </li>
              </Link>

              {/* Check if logged in or not */}
              {isLogin ? (
                <>
                  {userRole ? (  // Admin menu
                  <>
                    <li className={`nav-item ${currentDisplay("/userList") ? "active" : ""}`}>
                      <Link className="nav-link" to="/userList" aria-current="page">
                        <i className="fa-solid fa-cogs icon-margin-right d-none d-lg-inline"
                          style={{ color: currentDisplay("/userList") ? "#d83f3f" : "#414141" }}></i>
                        User List
                      </Link>
                    </li>
                    <li className={`nav-item ${currentDisplay("/userLog") ? "active" : ""}`}>
                      <Link className="nav-link" to="/userLog" aria-current="page">
                        <i className="fa-solid fa-cogs icon-margin-right d-none d-lg-inline"
                          style={{ color: currentDisplay("/userLog") ? "#d83f3f" : "#414141" }}></i>
                        User Logs
                      </Link>
                    </li>
                    <li className={`nav-item ${currentDisplay("/editItem") ? "active" : ""}`}>
                      <Link className="nav-link" to="/editItem" aria-current="page">
                        <i className="fa-solid fa-cogs icon-margin-right d-none d-lg-inline"
                          style={{ color: currentDisplay("/editItem") ? "#d83f3f" : "#414141" }}></i>
                        Edit Tree Items
                      </Link>
                    </li>
                    <li className={`nav-item ${currentDisplay("/editSong") ? "active" : ""}`}>
                      <Link className="nav-link" to="/editSong" aria-current="page">
                        <i className="fa-solid fa-cogs icon-margin-right d-none d-lg-inline"
                          style={{ color: currentDisplay("/editSong") ? "#d83f3f" : "#414141" }}></i>
                        Edit Songs
                      </Link>
                    </li>
                    </>
                  ):<><li className={`nav-item ${currentDisplay("/") ? "active" : ""}`}>
                  <Link className="nav-link" to="/" aria-current="page">
                    <i className="fa-solid fa-house icon-margin-right d-none d-lg-inline"
                      style={{ color: currentDisplay("/") ? "#d83f3f" : "#414141" }}></i>
                    Home
                  </Link>
                </li>
                <li className={`nav-item ${currentDisplay("/play") ? "active" : ""}`}>
                  <Link className="nav-link" to="/play" aria-current="page">
                    <i className="fa-solid fa-music icon-margin-right d-none d-lg-inline"
                      style={{ color: currentDisplay("/play") ? "#d83f3f" : "#414141" }}></i>
                    PlayList
                  </Link>
                </li>
                <li className={`nav-item ${currentDisplay("/profile") ? "active" : ""}`}>
                    <Link className="nav-link" to="/profile" aria-current="page">
                      <i className="fa-solid fa-user icon-margin-right d-none d-lg-inline"
                        style={{ color: currentDisplay("/profile") ? "#d83f3f" : "#414141" }}></i>
                      Profile
                    </Link>
                  </li></>}
                  
                  <li className={`nav-item ${currentDisplay("/logout") ? "active" : ""}`}>
                    <Link className="nav-link" to="/logout" aria-current="page">
                      <i className="fa-solid fa-right-from-bracket icon-margin-right d-none d-lg-inline"
                        style={{ color: currentDisplay("/logout") ? "#d83f3f" : "#414141" }}></i>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className={`nav-item ${currentDisplay("/login") ? "active" : ""}`}>
                    <Link className="nav-link" to="/login" aria-current="page">
                      <i className="fa-solid fa-right-to-bracket icon-margin-right d-none d-lg-inline"
                        style={{ color: currentDisplay("/login") ? "#d83f3f" : "#414141" }}></i>
                      Login
                    </Link>
                  </li>
                  <li className={`nav-item ${currentDisplay("/register") ? "active" : ""}`}>
                    <Link className="nav-link" to="/register" aria-current="page">
                      <i className="fa-solid fa-plus icon-margin-right d-none d-lg-inline"
                        style={{ color: currentDisplay("/register") ? "#d83f3f" : "#414141" }}></i>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
