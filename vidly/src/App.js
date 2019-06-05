import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/common/notFound";
import MovieForm from "./components/movieForm";

function App() {
  return (
    <div>
      <NavBar />
      <main className="content">
        <Switch>
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/notFound" component={NotFound} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/notFound" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
