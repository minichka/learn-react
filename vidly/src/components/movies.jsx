import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import Filter from "./common/filter";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentFilter: "",
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }
  handleDelete = movie => {
    deleteMovie(movie._id);
    this.setState({ movies: getMovies() });
  };

  handleLike = movie => {
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

  handleSort = sortColumn => {
    this.setState({ sortColumn: sortColumn });
  };

  getPageData = () => {
    const {
      currentFilter,
      movies: allMovies,
      sortColumn,
      currentPage,
      pageSize
    } = this.state;
    const moviesFilter = currentFilter._id
      ? allMovies.filter(m => m.genre._id === currentFilter._id)
      : allMovies;

    const sorted = _.orderBy(
      moviesFilter,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: moviesFilter.length, data: movies };
  };
  render() {
    if (this.state.movies.length === 0) {
      return <p>There are no movies in the database</p>;
    }

    const { totalCount, data: movies } = this.getPageData();

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
            <div className="row">
              <Link to="/movies/new">
                <button className="btn btn-primary">New Movie</button>
              </Link>
            </div>

            <div className="row">
              <b>Showing {totalCount} movies in the database</b>
              <MoviesTable
                movies={movies}
                sortColumn={this.state.sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={this.state.pageSize}
                currentPage={this.state.currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
