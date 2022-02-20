import React, { useContext, useEffect, useState } from "react";
import "./Pool.scss";
import axios from "axios";
import domain from "../../util/domain";
import UserContext from "../../context/UserContext";

function Pool() {
  let [poolData, setPoolData] = useState([]);
  const [data, setData] = useState([]);

  async function getAllPicks() {
    let data = await axios.get(`${domain}/pool/`);
    setPoolData(data.data);
    console.log(poolData);
  }

  let labelArray = [...data]
  console.log(labelArray)

  // delete picks once every day
  useEffect(() => {
    setInterval(function () {
      let date = new Date();
      if (date.getHours() === 22 && date.getMinutes() === 41) {
        axios.delete(`${domain}/picks/`);
      }
    }, 1000);
  }, []);

  // GET USERNAME
  const { user } = useContext(UserContext);

  const [username, setUsername] = useState("");
  async function getUser() {
    const userRes = await axios.get(`${domain}/loggedIn/${user}`);
    setUsername(userRes.data.username);
  }
  getUser();

  useEffect(() => {
    fetch(`${domain}/games`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.scoreboard.games);
      });
  }, []);

  useEffect(() => {
    getAllPicks();
  }, []);

  return (
    <div className="pool">
      <div className="label-container">
        <div className="labels">
          <div className="name-label">
            <p> Player </p>
          </div>

          {labelArray.map((item) => {
            return (
              <div className="label-box">
                <p> {item.homeTeam.teamTricode}</p>
                <p> vs</p>
                <p> {item.awayTeam.teamTricode}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="all-picks">
        {poolData.map((item) => {
          return (
            <div className="user-pick-box">
              <div className="user">
                <p className="user-email">{item.username}</p>
              </div>

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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Pool;
