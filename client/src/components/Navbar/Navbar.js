import React, { useContext, useEffect, useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import domain from "../../util/domain";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import { useHistory } from "react-router-dom";

function Navbar({theme, setTheme}) {
  const { user } = useContext(UserContext);

  const history = useHistory();

  // GET USERNAME AND FAV TEAM
  const [username, setUsername] = useState("");
  const [favTeam, setFavTeam] = useState("");
  async function getUser() {
    const userRes = await axios.get(`${domain}/loggedIn/${user}`);
    setUsername(userRes.data.username);
    setFavTeam(userRes.data.favoriteTeam);
  }
  getUser();

  // LOGOUT USER
  async function logOut() {
    await axios.get(`${domain}/auth/logOut`);
    await getUser();
    history.push("/login");
  }

  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="navbar">
      <div className="brand">
        <div className="brand-content">
          <h1> Poolhost </h1>
        </div>
      </div>
      {showMenu ? (
        <div className="dropdown">
          <ul className="nav-links-mobile">
            <Link to="/" className="link" onClick={() => setShowMenu(false)}>
              Home
            </Link>
            <Link
              to="/picks"
              className="link"
              onClick={() => setShowMenu(false)}
            >
              Picks
            </Link>
            <Link
              to="/pool"
              className="link"
              onClick={() => setShowMenu(false)}
            >
              Pool
            </Link>
           
            {/* <Link to="/" className="link" onClick={() => setShowMenu(false)}>
              About
            </Link>
            <Link to="/" className="link" onClick={() => setShowMenu(false)}>
              Contact
            </Link> */}
          </ul>
          <ul className="user-links-mobile">
            {user ? (
              <>
                <div className="show-email">
                  <p>Signed in as: {username}</p>
                </div>
                <button className="logout-btn btn" onClick={logOut}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="link btn"
                  onClick={() => setShowMenu(false)}
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="link btn"
                  onClick={() => setShowMenu(false)}
                >
                  Login
                </Link>

              </>
            )}
          </ul>
        </div>
      ) : (
        <>
          <ul className="nav-links">
            <Link to="/" className="link">
              Home
            </Link>
            <Link to="/picks" className="link">
              Picks
            </Link>
            <Link to="/pool" className="link">
              Pool
            </Link>
            <Link
              to="/pool"
              className="link"
              onClick={() => setShowMenu(false)}
            >
              About
            </Link>
            <Link
              to="/pool"
              className="link"
              onClick={() => setShowMenu(false)}
            >
              Contact
            </Link>
            {/* <Link to="/" className="link">
      About
    </Link>
    <Link to="/" className="link">
      Contact
    </Link> */}
          </ul>
        </>
      )}

      <ul className="user-links">
      <p className="dark-mode" onClick={() => setTheme(!theme)}>  Dark Mode </p>

        {user ? (
          <div className="username-logo">

            <div className="wrapper">

              <p>{username}</p>
              <img
                src={`../icons/${favTeam}.svg`}
                className="nav-logo"
                alt=""
              />
            </div>

            <div className="burger-desktop">
              {/* <GiHamburgerMenu
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="desktop-burger"
              /> */}
            </div>

            <div className={showUserMenu ? "user-menu" : "hide"}>
              <button className="logout-btn btn" onClick={logOut}>
                Log out
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/register" className="link">
              Register
            </Link>
            <Link to="/login" className="link">
              Login
            </Link>
          </>
        )}
      </ul>

      <div className="burger">
        <img
          src={`../icons/${favTeam}.svg`}
          className="nav-logo-mobile"
          alt=""
        />
        {/* <GiHamburgerMenu onClick={() => setShowMenu(!showMenu)} /> */}
      </div>
    </div>
  );
}

export default Navbar;
