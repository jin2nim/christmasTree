import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../User/css/main.css";

export default function Navbar({ isLogin, userRole }) {
  const location = useLocation();

  useEffect(() => {
    const navBarCollapse = document.getElementById("navbarNav");
    const closeNavbar = () => {
      if (window.innerWidth < 992) {
        navBarCollapse.classList.remove("show");
      }
    };
    closeNavbar();
  }, [location]);

  const currentDisplay = (path) => location.pathname === path;

  return (
    <div className="nav-wrap">
      <nav className="navbar navbar-expand-lg nav-icon">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={`${process.env.PUBLIC_URL}/santa.png`} alt="Santa Icon" />
            Christmas Playlist
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {isLogin ? (
                <>
                  {userRole === "admin" ? (
                    <>
                      <li className={`nav-item ${currentDisplay("/userList") ? "active" : ""}`}>
                        <Link className="nav-link" to="/userList">
                          User List
                        </Link>
                      </li>
                      <li className={`nav-item ${currentDisplay("/userLog") ? "active" : ""}`}>
                        <Link className="nav-link" to="/userLog">
                          User Logs
                        </Link>
                      </li>
                      <li className={`nav-item ${currentDisplay("/editItem") ? "active" : ""}`}>
                        <Link className="nav-link" to="/editItem">
                          Edit Items
                        </Link>
                      </li>
                      <li className={`nav-item ${currentDisplay("/editSong") ? "active" : ""}`}>
                        <Link className="nav-link" to="/editSong">
                          Edit Songs
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className={`nav-item ${currentDisplay("/") ? "active" : ""}`}>
                        <Link className="nav-link" to="/">
                          Home
                        </Link>
                      </li>
                      <li className={`nav-item ${currentDisplay("/play") ? "active" : ""}`}>
                        <Link className="nav-link" to="/play">
                          PlayList
                        </Link>
                      </li>
                      <li className={`nav-item ${currentDisplay("/profile") ? "active" : ""}`}>
                        <Link className="nav-link" to="/profile">
                          Profile
                        </Link>
                      </li>
                    </>
                  )}
                  <li className={`nav-item ${currentDisplay("/logout") ? "active" : ""}`}>
                    <Link className="nav-link" to="/logout">
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className={`nav-item ${currentDisplay("/login") ? "active" : ""}`}>
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className={`nav-item ${currentDisplay("/register") ? "active" : ""}`}>
                    <Link className="nav-link" to="/register">
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