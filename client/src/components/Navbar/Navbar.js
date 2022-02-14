import React, { useContext } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import domain from "../../util/domain";
import axios from "axios";

function Navbar() {
  const { user, getUser } = useContext(UserContext);

  async function logOut() {
    await axios.get(`${domain}/auth/logOut`);
    await getUser();
  }

 

  return (
    <div className="navbar">
      <div className="brand">
        <h1> Poolhost </h1>
      </div>
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
            <Link to="/login" className="link">
              Login
            </Link>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
