import React, { useContext, useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import domain from "../../util/domain";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  const { user, getUser } = useContext(UserContext);

  async function logOut() {
    await axios.get(`${domain}/auth/logOut`);
    await getUser();
  }

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="navbar">
      <div className="brand">
        <h1> Poolhost </h1>
      </div>
      {showMenu ? (
        <div className="dropdown">
          <ul className="nav-links-mobile">
            <Link to="/" className="link" onClick={() => setShowMenu(false)}>
              Home
            </Link>
            <Link to="/" className="link" onClick={() => setShowMenu(false)}>
              Picks
            </Link>
            <Link to="/pool" className="link" onClick={() => setShowMenu(false)}>
              Pool
            </Link>
            <Link to="/" className="link" onClick={() => setShowMenu(false)}>
              About
            </Link>
            <Link to="/" className="link" onClick={() => setShowMenu(false)}>
              Contact
            </Link>
          </ul>
          <ul className="user-links-mobile">
            {user ? (
              <button className="logout-btn btn" onClick={logOut}>
                Log out
              </button>
            ) : (
              <>
                <Link to="/register" className="link btn" onClick={() => setShowMenu(false)}>
                  Register
                </Link>
                <Link to="/login" className="link btn" onClick={() => setShowMenu(false)}>
                  Login
                </Link>
              </>
            )}
          </ul>
        </div>
      ) : (
        <ul className="nav-links">
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/" className="link">
            Picks
          </Link>
          <Link to="/pool" className="link">
            Pool
          </Link>
          <Link to="/" className="link">
            About
          </Link>
          <Link to="/" className="link">
            Contact
          </Link>
        </ul>
      )}

      <ul className="user-links">
        {user ? (
          <button className="logout-btn" onClick={logOut}>
            Log out
          </button>
        ) : (
          <>
            <Link to="/register" className="link">
              Register
            </Link>
            <Link to="/login" className="link" >
              Login
            </Link>
          </>
        )}
      </ul>
      <div className="burger">
        <GiHamburgerMenu onClick={() => setShowMenu(!showMenu)} />
      </div>
    </div>
  );
}

export default Navbar;
