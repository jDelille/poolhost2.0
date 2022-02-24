import React, { useState, useContext } from "react";
import axios from "axios";
import domain from "../../util/domain";
import UserContext from "../../context/UserContext";
import "./Profile.scss";
import ErrorMessage from "../misc/ErrorMessage";
import { useHistory } from "react-router-dom";

function Profile() {
  const { user } = useContext(UserContext);

  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formPasswordConfirm, setFormPasswordConfirm] = useState("");
  const [formUsername, setFormUsername] = useState("");
  const [formFavTeam, setFormFavTeam] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [favTeam, setFavTeam] = useState("");

  const history = useHistory();

  async function getUser() {
    const userRes = await axios.get(`${domain}/loggedIn/${user}`);
    setUsername(userRes.data.username);
    setFavTeam(userRes.data.favoriteTeam);
  }
  getUser();

  console.log(user)

  async function register(e) {
    e.preventDefault();

    const registerData = {
      // email: formEmail,
      // password: formPassword,
      // passwordConfirm: formPasswordConfirm,
      username: formUsername,
      // favoriteTeam: formFavTeam,
    };

    try {
      await axios.put(`${domain}/auth/${user}`, registerData);
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }

    await getUser();
    history.push("/");
  }

  return (
    <div className="profile-page">
      <div className="content">
        <h1> Hey {username} </h1>
        <p> Change username </p>
        <input
          type="text"
          value={formUsername}
          id="form-username"
          onChange={(e) => setFormUsername(e.target.value)}
        />
        <button onClick={register}> Submit </button>
        <p> Change Email </p>
        <p> Change favorite team</p>
      </div>
    </div>
  );
}

export default Profile;
