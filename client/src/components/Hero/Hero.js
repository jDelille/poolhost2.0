import React, { useEffect, useState } from "react";
import "./Hero.scss";
import $ from "jquery";
import axios from 'axios'
import domain from '../../util/domain'

function Hero() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/games")
      .then((res) => res.json())
      .then((data) => {
        setData(data.scoreboard.games);
      });
  }, []);

  console.log(data);

  const [pick, setPick] = useState([]);

  function handleSubmit() {
    let radios = document.querySelectorAll("#radio");

    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        setPick((prevState) => [...prevState, radios[i].value]);
      }
    }
  }

  let array = [...new Set(pick)];
  console.log(array);

  const [selected, setSelected] = useState(false);

  function handleClick(id) {
    setSelected(id);
  }

  // set background color for selected teams.

  $(document).ready(function () {
    $("input:radio").change(function () {
      var $this = $(this);
      $this
        .closest(".games-box")
        .find("label.highlight")
        .removeClass("highlight");
      $this.closest(".box").addClass("highlight");
    });
  });

  async function addPicks(e) {
    e.preventDefault();

    const picksData = {
      picks: array ? array : undefined,
    }
    
    axios.post(`${domain}/picks/`, picksData)
  }

  return (
    <div className="hero">
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
                    className='team-logo'
                    alt=""
                  />
                  </div>
                  
                  <div className="team-id">
                    <p> {item.homeTeam.teamCity}</p>
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
      <button onClick={handleSubmit} className="submit-btn">
        SUBMIT
      </button>

      <button onClick={addPicks}>ADD PICKS</button>
      <p> {array}</p>
    </div>
  );
}

export default Hero;
