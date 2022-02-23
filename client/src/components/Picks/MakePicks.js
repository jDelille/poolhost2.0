import React, { useState } from "react";
import { Link } from "react-router-dom";
import PicksPopup from "../Popup/PicksPopup";

function MakePicks({
  data,
  handleSubmit,
  addPicks,
  array,
  resetPicks,
  pick,
  setPick,
}) {
  const [locked, setLocked] = useState(true);
  const [popUp, setPopUp] = useState(false);
  return (
    <>
      {popUp ? (
        <div className="popup">
          <PicksPopup
            addPicks={addPicks}
            pick={pick}
            setPopUp={setPopUp}
            setPick={setPick}
          />
        </div>
      ) : (
        <p> </p>
      )}

      <div className="games-container">
        {data.map((item, index) => {
          return (
            <div className="games-box" key={index}>
              <div className="game">
                {/* HOME SIDE */}
                <label className="box">
                  <input
                    type="radio"
                    name={item.id}
                    id="radio"
                    value={item.homeEventResult.competitor.shortName}
                  />
                  <div className="logo">
                    <img
                      src={`../icons/${item.homeEventResult.competitor.shortName}.svg`}
                      className="team-logo"
                      alt=""
                    />
                  </div>

                  <div className="team-id">
                    <p> {item.homeEventResult.competitor.location}</p>
                    <p> Home </p>
                  </div>
                  <div className="abbr">
                    <p> {item.homeEventResult.competitor.shortName}</p>
                    <p> Home </p>
                  </div>
                  <div className="record">
                    <p>{item.homeEventResult.competitor.recordOverall}</p>
                  </div>
                </label>

                {/* GAME INFO */}
                <div className="game-info">
                  <p className="game-time">{item.gameStatus}</p>
                </div>

                {/* AWAY SIDE */}
                <label className="box">
                  <div className="logo">
                    <img
                      src={`../icons/${item.awayEventResult.competitor.shortName}.svg`}
                      className="team-logo"
                      alt=""
                    />
                  </div>

                  <input
                    type="radio"
                    name={item.id}
                    id="radio"
                    value={item.awayEventResult.competitor.shortName}
                    className="radio"
                  />
                  <div className="team-id">
                    <p> {item.awayEventResult.competitor.location}</p>
                    <p> Away </p>
                  </div>
                  <div className="abbr">
                    <p> {item.awayEventResult.competitor.shortName}</p>
                    <p> Home </p>
                  </div>
                  <div className="record">
                    <p>{item.awayEventResult.competitor.recordOverall}</p>
                  </div>
                </label>
              </div>
              <div className="leaders"></div>
            </div>
          );
        })}
        <div className="btn-container">
        <button
          onClick={() => {
            handleSubmit();
            setLocked(false);
            setPopUp(true);
          }}
          className="btn"
        >
          Add Picks
        </button>
      </div>
      </div>
      
    </>
  );
}

export default MakePicks;
