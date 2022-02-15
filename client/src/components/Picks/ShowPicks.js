import React, { useEffect, useState } from "react";
import "./ShowPicks.scss";
import axios from "axios";
import domain from "../../util/domain";

function ShowPicks({ picks, getPicks, editPicks, data }) {
  const [loading, setLoading] = useState(false);

  // DELETE PICKS

  async function deletePicks() {
    if (window.confirm("Do you want to delete your picks?"))
      await axios.delete(`${domain}/picks/${picks._id}`);

    getPicks();
  }

  // delete picks once every day
  useEffect(() => {
    setInterval(function () {
      let date = new Date();
      if (date.getHours() === 11 && date.getMinutes() === 50) {
        axios.delete(`${domain}/picks/`);
      }
    }, 1000);
  }, []);

  return (
    <div className="show-picks">
      <div className="label-container">
        <div className="labels">
          {data.map((item) => {
            return (
              <div className="labels-box">
                <p> {item.homeTeam.teamTricode}</p>
                <p> vs</p>
                <p> {item.awayTeam.teamTricode}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="picks-container">
        <div className="picks">
          {!picks ? (
            <p> Loading </p>
          ) : (
            picks.picks.map((item) => {
              return (
                <div className="pick">
                  <img src={`../icons/${item}.svg`} className="logo" alt="" />
                </div>
              );
            })
          )}
        </div>
      </div>

      <button className="delete-btn" onClick={deletePicks}>
        Delete
      </button>
    </div>
  );
}

export default ShowPicks;
