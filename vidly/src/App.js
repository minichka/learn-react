import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "./components/common/protectedRoute";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/common/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import { getCurrentUser } from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
    try {
      const user = getCurrentUser();
      this.setState({ user });
    } catch (ex) {}
  }
  render() {
    return (
      <div>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="content">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/movies/new" component={MovieForm} />
            <Route
              path="/movies"
              render={props => <Movies {...props} user={this.state.user} />}
            />
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
}

export default App;
