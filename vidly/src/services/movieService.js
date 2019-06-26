import httpService from "./httpService";
import config from "../config.json";

export function getMovies() {
  return httpService.get(`${config.apiEndpoint}/movies`);
}

export function deleteMovie(id) {
  return httpService.delete(`${config.apiEndpoint}/movies/${id}`);
}

export function getMovie(id) {
  return httpService.get(`${config.apiEndpoint}/movies/${id}`);
}

export function saveMovie(movie) {
  const body = { ...movie };
  delete body._id;
  if (movie._id) {
    return httpService.put(`${config.apiEndpoint}/movies/${movie._id}`, body);
  }
  return httpService.post(`${config.apiEndpoint}/movies`, body);
}
