import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import Gamebar from "./components/Gamebar/Gamebar";
import Pool from "./components/Pool/Pool";
import Home from "./components/Home/Home";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Gamebar />
          <Navbar />
          <Home />
        </Route>
        <Route exact path="/picks">
          <Gamebar />
          <Navbar />
          <Hero />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/pool">
          <Gamebar />
          <Navbar />
          <Pool />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
