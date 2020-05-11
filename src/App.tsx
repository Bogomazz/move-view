import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Header } from "./components/Header";
import { WorkoutChecker } from './WorkoutChecker';
import { WorkoutsList } from "./components/WorkoutsList";
import { Auth } from "./components/Auth";
import { CreateWorkout } from "./components/CreateWorkout";


export default function App() {
 return ( 
  <>
  <Router>
    <Header></Header>
    <Switch>
      <Route exact path="/">
        <WorkoutsList />
      </Route>
      <Route path="/checker">
        <WorkoutChecker />
      </Route>
      <Route path="/auth">
        <Auth />
      </Route>
      <Route path="/create">
        <CreateWorkout />
      </Route>
    </Switch>
  </Router>
  </>
 )
}