import React, { useState, useEffect } from "react";
import "./Gamebar.scss";
import { MdArrowRight } from "react-icons/md";
import axios from "axios";
import { BsPlusCircle } from "react-icons/bs";
import { ImArrowLeft, ImArrowRight } from "react-icons/im";

function Gamebar() {
  const [data, setData] = useState([]);

  let [date, setDate] = useState(20220210);
  const [scroll, setScroll] = useState(false);

 

  useEffect(() => {
    fetch('/games')
    .then((res) => res.json())
    .then((data) => {
      setData(data.scoreboard.games)
    })
  },[])

  function scrollGamebarForward() {
    document.getElementById("container").scrollLeft += 820;
  }

  function scrollGamebarBack() {
    document.getElementById("container").scrollLeft -= 820;
  }

  console.log(data);

  return (
    <div className="gamebar">
      {/* <div className="date-picker">
        

        {data.map(item => {
          return <p> {item?.date}</p>
        })}
      </div> */}
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
      {/* <div className="scroller">
        {scroll ? (
          <ImArrowRight
            className="arrow"
            onClick={() => {
              scrollGamebarForward();
              setScroll(!scroll);
            }}
          />
        ) : (
          <ImArrowLeft
            className="arrow"
            onClick={() => {
              scrollGamebarBack();
              setScroll(!scroll);
            }}
          />
        )}
        <button > - </button>
      </div> */}
    </div>
  );
}

export default Gamebar;
