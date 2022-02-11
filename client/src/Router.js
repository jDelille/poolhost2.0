import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import Gamebar from './components/Gamebar/Gamebar'

function Router() {
 return (
  <BrowserRouter>
   <Navbar />
   <Gamebar />
   <Switch>
    <Route exact path='/'>
     <Hero />
    </Route>
    <Route path='/login'>
     <Login />
    </Route>
    <Route path='/register'>
     <Register />
    </Route>
   </Switch>
  </BrowserRouter>
 )
}


export default Router;
