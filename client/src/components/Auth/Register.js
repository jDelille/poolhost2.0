import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ErrorMessage from "../misc/ErrorMessage";
import "./AuthForm.scss";
import "./AuthPages.scss";
import domain from "../../util/domain";
import { data } from "./team";

function Register() {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formPasswordConfirm, setFormPasswordConfirm] = useState("");
  const [formUsername, setFormUsername] = useState("");
  const [formFavTeam, setFormFavTeam] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const { getUser } = useContext(UserContext);

  const history = useHistory();

  async function register(e) {
    e.preventDefault();

    const registerData = {
      email: formEmail,
      password: formPassword,
      passwordConfirm: formPasswordConfirm,
      username: formUsername,
      favoriteTeam: formFavTeam,
    };

    try {
      await axios.post(`${domain}/auth/`, registerData);
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

  console.log(formFavTeam)


  function selectTeam() {
    let favTeam = document.getElementById('fav-team').value;
    setFormFavTeam(favTeam)

  }




 


  return (
    <div className="register-page">
      <div className="auth-form-register">
        <h2> Create an account </h2>
        {errorMessage && (
          <ErrorMessage
            message={errorMessage}
            clear={() => setErrorMessage(null)}
          />
        )}
        <form className="form" onSubmit={register}>
          <div className="form-inputs">
            <label htmlFor="form-email">Email</label>
            <input
              type="email"
              value={formEmail}
              id="form-email"
              onChange={(e) => setFormEmail(e.target.value)}
            />
            <label htmlFor="form-username">Username</label>
            <input
              type="text"
              value={formUsername}
              id="form-username"
              onChange={(e) => setFormUsername(e.target.value)}
            />
            <label htmlFor="form-password">Password</label>
            <input
              type="password"
              value={formPassword}
              id="form-password"
              onChange={(e) => setFormPassword(e.target.value)}
            />
            <label htmlFor="form-password-confirm">Confirm Password</label>
            <input
              type="password"
              value={formPasswordConfirm}
              id="form-password-confirm"
              onChange={(e) => setFormPasswordConfirm(e.target.value)}
            />
            <label htmlFor="fav-team">Favorite Team</label>
            <select id="fav-team" onChange={selectTeam} >
              <option> Choose a team </option>

              {data.map((option) => {
                return <option value={option} > {option} </option>;
              })}
            </select>
          </div>
          <button className="submit-btn" type="submit">
            Create account
          </button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
