import React, { Component } from "react";
import Table from "./common/table";
import Like from "./common/like";
import { Link } from "react-router-dom";
import { getCurrentUser } from "./../services/authService";
class MoviesTable extends Component {
  state = {};
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      )
    }
  ];

  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger"
      >
        Delete
      </button>
    )
  };
  constructor() {
    super();
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }
  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        className="m-2"
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={movies}
      />
    );
  }
}

export default MoviesTable;
