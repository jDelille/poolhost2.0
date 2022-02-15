import React, { useContext, useEffect, useState } from "react";
import "./Hero.scss";
import $ from "jquery";
import axios from "axios";
import domain from "../../util/domain";
import ErrorMessage from "../misc/ErrorMessage";
import UserContext from "../../context/UserContext";
import MakePicks from "../Picks/MakePicks";
import ShowPicks from "../Picks/ShowPicks";
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
  

  const [email, setEmail] = useState('')

  async function getUser() {
    const userRes = await axios.get(`${domain}/loggedIn/${user}`);
    setEmail(userRes.data.email)
  }

  getUser()

  
  useEffect(() => {
    if (!user) setPicks([]);
    else getPicks()
  },[user])

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
    fetch("/games")
      .then((res) => res.json())
      .then((data) => {
        setData(data.scoreboard.games);
      });
  }, []);


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
      email: email
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



  return (
    <div className="hero">
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
              />
            </>
          )}
    </div>
  );
}

export default Hero;
