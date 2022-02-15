import React, { useState } from "react";
import { Link } from "react-router-dom";

function MakePicks({ data, handleSubmit, addPicks, array, resetPicks, pick }) {
  const [locked, setLocked] = useState(true);

  
  return (
    <>
      <div className="text"></div>
      <div className="games-container">
        {data.map((item, index) => {
          return (
            <div className="games-box" key={index}>
              <div className="game">
                {/* HOME SIDE */}
                <label className="box">
                  <input
                    type="radio"
                    name={item.gameId}
                    id="radio"
                    value={item.homeTeam.teamTricode}
                  />
                  <div className="logo">
                    <img
                      src={`../icons/${item.homeTeam.teamTricode}.svg`}
                      className="team-logo"
                      alt=""
                    />
                  </div>

                  <div className="team-id">
                    <p> {item.homeTeam.teamCity}</p>
                    <p> Home </p>
                  </div>
                  <div className="abbr">
                    <p> {item.homeTeam.teamTricode}</p>
                    <p> Home </p>
                  </div>
                  <div className="record">
                    <p>
                      ({item.homeTeam.wins} - {item.homeTeam.losses})
                    </p>
                  </div>
                </label>

                {/* GAME INFO */}
                <div className="game-info">
                  <p className="game-time">{item.gameStatusText}</p>
                  <p>{item.seriesSummary}</p>
                </div>

                {/* AWAY SIDE */}
                <label className="box">
                  <div className="logo">
                    <img
                      src={`../icons/${item.awayTeam.teamTricode}.svg`}
                      className="team-logo"
                      alt=""
                    />
                  </div>

                  <input
                    type="radio"
                    name={item.gameId}
                    id="radio"
                    value={item.awayTeam.teamTricode}
                    className="radio"
                  />
                  <div className="team-id">
                    <p> {item.awayTeam.teamCity}</p>
                    <p> Away </p>
                  </div>
                  <div className="abbr">
                    <p> {item.awayTeam.teamTricode}</p>
                    <p> Away </p>
                  </div>
                  <div className="record">
                    <p>
                      ({item.awayTeam.wins} - {item.awayTeam.losses})
                    </p>
                  </div>
                </label>
              </div>
              <div className="leaders"></div>
            </div>
          );
        })}
      </div>
      <div className="btn-container">
        {pick.length > 0 ? (
          <button
            onClick={() => {
              resetPicks();
              setLocked(false);
            }}
            className="btn"
          >
            Reset Picks
          </button>
        ) : (
          <button
            onClick={() => {
              handleSubmit();
              setLocked(false);
            }}
            className="btn"
          >
            Add Picks
          </button>
        )}
      
        <div className="show-picks-container ">
          <p> Your Picks: </p>
          <div className="logos">
            {pick.map((item) => {
              return (
                <img src={`../icons/${item}.svg`} className="logo" alt="" />
              );
            })}
          </div>
        </div>
        {pick.length === 0 ? (
          <button disabled className="btn">
            Go to Pool
          </button>
        ) : (
          <Link className="btn" onClick={addPicks} to="/pool">
            Go to Pool
          </Link>
        )}
      </div>
    </>
  );
}

export default MakePicks;
