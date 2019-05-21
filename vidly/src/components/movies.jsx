import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import Filter from "./common/filter";
import { paginate } from "../utils/paginate";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentFilter: ""
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }
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

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleFilterChange = filter => {
    this.setState({ currentFilter: filter, currentPage: 1 });
  };
  render() {
    const moviesFilter = this.state.currentFilter._id
      ? this.state.movies.filter(
          m => m.genre._id === this.state.currentFilter._id
        )
      : this.state.movies;
    const movies = paginate(
      moviesFilter,
      this.state.currentPage,
      this.state.pageSize
    );
    if (this.state.movies.length === 0) {
      return <p>There are no movies in the database</p>;
    }

    //const genres = getGenres();

    return (
      <div className="container m-5">
        <div className="row">
          <div className="col-3">
            <Filter
              items={this.state.genres}
              currentFilter={this.state.currentFilter}
              onFilterChange={this.handleFilterChange}
            />
          </div>
          <div className="col-9">
            <b>Showing {moviesFilter.length} movies in the database</b>
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
                {movies.map(movie => (
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
            <Pagination
              itemsCount={moviesFilter.length}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
