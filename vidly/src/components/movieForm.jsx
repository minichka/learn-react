import React from "react";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
//import { saveMovie } from "../services/fakeMovieService";
import { getMovie, saveMovie } from "../services/movieService";
import Joi from "joi-browser";

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {},
    genres: []
  };
  schema = {
    _id: Joi.label("ID"),
    genreId: Joi.required().label("Genre"),
    title: Joi.string()
      .required()
      .min(5)
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

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    const { match, history } = this.props;
    try {
      if (match.params.id === "new") return;
      const { data: movie } = await getMovie(match.params.id);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        history.replace("/notFound");
    }
  }
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }
  doSubmit = async () => {
    const { history } = this.props;
    console.log(this.state.data);
    await saveMovie(this.state.data);
    history.push("/movies");
  };
  render() {
    return (
      <div className="m-2 container">
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genres", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
