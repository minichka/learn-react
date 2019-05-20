import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete = movie => {
    console.log(deleteMovie(movie._id));
    this.setState({ movies: getMovies() });
  };

  handleLike = movie => {
    console.log(movie);
    let movies = [...this.state.movies];
    movies.forEach(el => {
      if (el._id === movie._id) {
        el.liked = !el.liked;
      }
    });
    this.setState({ movies });
  };
  render() {
    if (this.state.movies.length === 0) {
      return <p>There are no movies in the database</p>;
    }
    return (
      <div className="container">
        <b>Showing {this.state.movies.length} movies in the database</b>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Movies;
