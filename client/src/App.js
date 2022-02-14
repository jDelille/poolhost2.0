import "./App.scss";
import Gamebar from "./components/Gamebar/Gamebar";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import Router from "./Router";
import { UserContextProvider } from "../src/context/UserContext";
import axios from "axios";

import React, {useState} from 'react'

axios.defaults.withCredentials = true;

function App() {

  return (

      <UserContextProvider>
        <div className="App">
          <Router />
        </div>
      </UserContextProvider>

  );
}

export default App;
