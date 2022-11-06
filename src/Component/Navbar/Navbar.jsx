import React from "react";
import { Link } from "react-router-dom";

function Navbar({loginData,logout}) {
  // console.log(loginData.name);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="home">
            Movies
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {loginData ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="home"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="movies">
                      Movies
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="tvshows">
                      TvShows
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="people">
                      People
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="about">
                      About
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!loginData? <>
                <li className="nav-item">
                <Link className="nav-link" to="login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="register">
                  Register
                </Link>
              </li>
              </> : <>
              <li className="nav-item">
                <Link className="nav-link fw-bold" >
                  {"Welcome " + loginData.name}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={logout} to="logout">
                  Logout
                </Link>
              </li>
              </>}
              
              
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
