import React, { useState, useEffect } from "react";
import "./Gamebar.scss";
import domain from "../../util/domain";

function Gamebar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${domain}/games`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.scoreboard.games);
      });
  }, []);

  return (
    <div className="gamebar">
      <div className="gamebar-contents" id="container">
        {data.map((item, index) => {
          return (
            <div className="gamebar-box" key={index}>
              {/* GAMEBOX TIME AND STATION */}
              <div className="gamebar-info">
                <p>{item.gameStatusText}</p>
              </div>

              {/* GAMEBOX HOME TEAM */}
              <div className="home">
                <div className="abbr">
                  <img
                    src={`../icons/${item.homeTeam.teamTricode}.svg`}
                    className="logo"
                    alt=""
                  />
                  <p>{item.homeTeam.teamTricode}</p>
                </div>

                <p>{item.homeTeam.score}</p>
              </div>

              {/* GAMEBOX AWAY TEAM */}
              <div className="away">
                <div className="abbr">
                  <img
                    src={`../icons/${item.awayTeam.teamTricode}.svg`}
                    className="logo"
                    alt=""
                  />
                  <p> {item.awayTeam.teamTricode}</p>
                </div>

                <p>{item.awayTeam.score}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Gamebar;
