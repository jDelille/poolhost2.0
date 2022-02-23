import React from "react";
import "./PicksPopup.scss";
import { Link } from "react-router-dom";

function PicksPopup({ pick, setPopUp, addPicks, setPick }) {
  console.log(pick);

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h1> Your Picks </h1>
        <div className="chosen-picks">
          {pick.map((item) => {
            return (
              <img src={`../icons/${item}.svg`} className="popup-logo" alt="" />
            );
          })}
        </div>
        <p>Reset your picks or continue to the pool</p>

        <div className="btn-container-popup">
          <button
            className="btn"
            onClick={() => {
              setPopUp(false);
              setPick([]);
            }}
          >
            Edit
          </button>
          <Link className="btn" onClick={addPicks} to="/pool">
            Go to Pool
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PicksPopup;
