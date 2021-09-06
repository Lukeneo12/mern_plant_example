import './App.css';

import React from "react";

// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";

// We import all the components we need in our app
import NavBar from "./components/navBar";
import PlantEdition from "./components/plantEdition";
import PlantCreation from "./components/plantCreation";
import PlantList from "./components/plantList";


const App = () => {
  return (
    <div>
      <NavBar />
      <Route exact path="/">
        <PlantList />
      </Route>
      <Route path="/edit/:id" component={PlantEdition} />
      <Route path="/create" component={PlantCreation} >
      </Route>
    </div>
  );
};

export default App;
