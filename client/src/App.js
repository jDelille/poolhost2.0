import "./styles/App.scss";
import Gamebar from "./components/Gamebar/Gamebar";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import Router from "./Router";
import { UserContextProvider } from "../src/context/UserContext";
import axios from "axios";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./Themes.js";
import React, { useState } from "react";

axios.defaults.withCredentials = true;

function App() {
  const [theme, setTheme] = useState(true);
  const StyledApp = styled.div``;
  return (
    <UserContextProvider>
      <ThemeProvider theme={theme ? lightTheme : darkTheme}>
        <GlobalStyles />
        <StyledApp className="App">
          <Router theme={theme} setTheme={setTheme} />
        </StyledApp>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App;
