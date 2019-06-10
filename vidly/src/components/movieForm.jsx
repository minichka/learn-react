import React from "react";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import Joi from "joi-browser";

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreID: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {},
    genres: []
  };
  schema = {
    _id: Joi.any(),
    genreID: Joi.required().label("Genre"),
    title: Joi.string()
      .required()
      .label("Title"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Rate")
  };
  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });
    const { match, history } = this.props;
    if (match.params.id !== "new") {
      console.log(match.params.id);
      const movie = getMovie(match.params.id);
      if (!movie) return history.replace("not-found");
      this.setState({ data: this.mapToViewModel(movie) });
    }
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreID: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }
  doSubmit = () => {
    const { history } = this.props;
    console.log(this.state.data);
    saveMovie(this.state.data);
    history.push("/movies");
  };
  render() {
    return (
      <div className="m-2 container">
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreID", "Genres", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
