import React, { useState, useEffect } from "react";
import "./Gamebar.scss";
import domain from "../../util/domain";

function Gamebar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${domain}/gamebar`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
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
                <p>{item.kickoff_display}</p>
              </div>

              {/* GAMEBOX HOME TEAM */}
              <div className="home">
                <div className="abbr">
                  <img
                    src={`../icons/${item.home_team_id}.svg`}
                    className="logo"
                    alt=""
                  />
                  <p>{item.home_team_id}</p>
                </div>
                {item.game_state === 'Scheduled' ? (
                  <p className="record">{item.home_team_wins} - {item.home_team_losses}</p>
                ):(
                  <p className="score">{item.home_team_score}</p>

                )}
              </div>

              {/* GAMEBOX AWAY TEAM */}
              <div className="away">
                <div className="abbr">
                  <img
                    src={`../icons/${item.road_team_id}.svg`}
                    className="logo"
                    alt=""
                  />
                  <p> {item.road_team_id}</p>
                </div>

                {item.game_state === 'Scheduled' ? (
                  <p className="record">{item.road_team_wins} - {item.road_team_losses}</p>
                ):(
                  <p className="score">{item.road_team_score}</p>

                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Gamebar;
