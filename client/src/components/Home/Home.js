import React, { useContext } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

function Home() {
  const { user } = useContext(UserContext);

  return (
    <div className="home-page">
      <div className="home-text">
        <h1> Daily NBA Pick'em </h1>
        <p> Make your picks and compete</p>
      </div>
      <div className="btn-container">
        {user ? (
          <>
            <Link to="/picks" className="link btn">
              Picks
            </Link>
            <Link to="/pool" className="link btn">
              Pool
            </Link>
          </>
        ) : (
          <>
            <Link to="/register" className="link btn">
              Register
            </Link>
            <Link to="/login" className="link btn">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
