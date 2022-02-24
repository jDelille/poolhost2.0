import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import Gamebar from "./components/Gamebar/Gamebar";
import Pool from "./components/Pool/Pool";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import About from "./components/About/About";

function Router({ theme, setTheme }) {
setTheme(true)
  return (
    <BrowserRouter>
      <Gamebar />
      <Navbar setTheme={setTheme}  />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/picks">
          <Hero />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/pool">
          <Pool />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        {/* <Route path='/profile'>
          <Profile />
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
