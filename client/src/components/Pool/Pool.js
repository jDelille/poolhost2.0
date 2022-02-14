import React, { useContext, useEffect, useState } from "react";
import "./Pool.scss";
import UserContext from "../../context/UserContext";
import axios from "axios";
import domain from "../../util/domain";

function Pool() {
  const { user } = useContext(UserContext);

  let [poolData, setPoolData] = useState([]);
  const [data, setData] = useState([]);

  async function getAllPicks() {
    let data = await axios.get(`${domain}/pool/`);
    setPoolData(data.data);
  }

  useEffect(() => {
    fetch("/games")
      .then((res) => res.json())
      .then((data) => {
        setData(data.scoreboard.games);
      });
  }, []);

  useEffect(() => {
    getAllPicks();
  }, []);

  return (
    <>
      <div className="labels">
        {data.map((item) => {
          return (
            <div className="label-box">
              <p> {item.homeTeam.teamTricode}</p>
              <p> vs</p>
              <p> {item.awayTeam.teamTricode}</p>
            </div>
          );
        })}
      </div>
      <div className="all-picks">
        {poolData.map((item) => {
          return (
            <div className="user-pick">
              {item.picks.map((picks) => {
                return (
                  <div className="picked-logo">
                    <img
                      src={`../icons/${picks}.svg`}
                      className="logo"
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Pool;
