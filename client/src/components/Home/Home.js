import React, { useContext } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

function Home() {
  const { user } = useContext(UserContext);

  return (
    <div className="home-page">
      <div className="left">
        <div className="home-text">
          <h1> Daily NBA Pick'em </h1>
          <p> Make your picks and compete</p>
        </div>
        <div className="btn-container-home">
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
      <div className="right">
        <div className="frame">
          <img src="../icons/cp3.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;
