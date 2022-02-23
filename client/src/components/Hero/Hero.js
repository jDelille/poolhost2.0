import React, { useContext, useEffect, useState } from "react";
import "./Hero.scss";
import $ from "jquery";
import axios from "axios";
import domain from "../../util/domain";
import ErrorMessage from "../misc/ErrorMessage";
import UserContext from "../../context/UserContext";
import MakePicks from "../Picks/MakePicks";
import ShowPicks from "../Picks/ShowPicks";
import moment from 'moment'
function Hero() {
  const [data, setData] = useState([]);

  const { user } = useContext(UserContext);

  // EDIT PICKS
  const [editPickData, setEditPickData] = useState(null);
  const [picksEditorOpen, setPicksEditorOpen] = useState(false);

  function editPicks(picksData) {
    setEditPickData(picksData);
    setPicksEditorOpen(true);
  }

  // GET PICKS
  const [picks, setPicks] = useState([]);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  async function getUser() {
    const userRes = await axios.get(`${domain}/loggedIn/${user}`);
    setEmail(userRes.data.email);
    setUsername(userRes.data.username);
  }

  console.log(username);

  getUser();

  useEffect(() => {
    if (!user) setPicks([]);
    else getPicks();
  }, [user]);

  async function getPicks() {
    const pickRes = await axios.get(`${domain}/picks/`);
    setPicks(pickRes.data);
  }

  // RENDER PICKS

  function renderPicks() {
    let sortedPicks = [...picks];
    sortedPicks = sortedPicks.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return sortedPicks.map((picks, i) => {
      return (
        <ShowPicks
          key={i}
          picks={picks}
          getPicks={getPicks}
          editPicks={editPicks}
          data={data}
        />
      );
    });
  }

  useEffect(() => {
    fetch(`${domain}/schedule`)
      .then((res) => res.json())
      .then((data) => {
        setData(data[1].eventList);
      });
  }, []);

  console.log(data)

  let [pick, setPick] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  function handleSubmit() {
    let radios = document.querySelectorAll("#radio");

    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        setPick((prevState) => [...prevState, radios[i].value]);
      }
    }
  }

  async function addPicks() {
    const picksData = {
      picks: pick,
      user: user,
      email: email,
      username: username,
    };
    try {
      axios.post(`${domain}/picks/`, picksData);
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
    }
  }

  let array = [...new Set(pick)];

  function resetPicks() {
    array = [];
  }

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

  let gameDate = moment(data[1]?.date).format('MMMM DD')

  return (
    <div className="hero">
      <div className="content">
        <p className="content-date">
          Make your picks for <br />
          <span>{gameDate}</span>
        </p>
        <div className="instructions">
          <p> Choose one team for each game. </p>
          <p>
            If a game is in progress you will not be able to make a pick for
            that game.
          </p>
          <p> Once you have made your picks click the add picks button.</p>
          <p>
            If you want to change your picks later you can do so before the
            deadline.
          </p>
        </div>
      </div>
      {picks.length > 0
        ? renderPicks()
        : user && (
            <>
              <MakePicks
                data={data}
                handleSubmit={handleSubmit}
                array={array}
                addPicks={addPicks}
                resetPicks={resetPicks}
                pick={pick}
                setPick={setPick}
              />
            </>
          )}
    </div>
  );
}

export default Hero;
