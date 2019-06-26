import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import Filter from "./common/filter";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import { toast } from "react-toastify";

import _ from "lodash";
import { Link } from "react-router-dom";
import Search from "./common/search";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentFilter: "",
    sortColumn: { path: "title", order: "asc" },
    searchQuery: ""
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }
  handleDelete = async movie => {
    const originalMovies = [...this.state.movies];
    this.setState({ movies: originalMovies.filter(m => m._id !== movie._id) });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");

      this.setState({ movies: originalMovies });
    }
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
    this.setState({ currentFilter: filter, searchQuery: "", currentPage: 1 });
  };

  handleSearchChange = query => {
    this.setState({
      searchQuery: query,
      currentFilter: null,
      currentPage: 1
    });
  };
  handleSort = sortColumn => {
    this.setState({
      sortColumn: sortColumn
    });
  };

  getPageData = () => {
    const {
      currentFilter,
      movies: allMovies,
      sortColumn,
      currentPage,
      pageSize,
      searchQuery
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (currentFilter && currentFilter._id)
      filtered = currentFilter._id
        ? allMovies.filter(m => m.genre._id === currentFilter._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
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
              <Search
                searchQuery={this.state.searchQuery}
                onSearchChange={this.handleSearchChange}
              />
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
