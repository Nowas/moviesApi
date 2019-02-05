import { Repository } from "..//repositories";
import { MovieModel } from "../models/movie.model";
import { resolve } from "dns";
var querystring = require('querystring');
var fetch = require("node-fetch");

export class MoviesService {
  protected db: Repository

  constructor(db: Repository) {
    this.db = db
  }

  async getMovies(id?: number): Promise<MovieModel[]> {
    let getResult = await this.db.movies().get(id)
    return getResult
  }

  async addMovieToCollection(title: string): Promise<MovieModel> {
    let dbResults = await this.db.movies().find(title)

    if( dbResults.length > 0)
      throw new Error('Movie already in DB')

    const response = await fetch(`http://www.omdbapi.com/?t=${querystring.escape(title)}&apikey=${process.env.PN_MOVIE_DB_KEY}`);
    const json = await response.json();
    if( json.Error == 'Movie not found!')
      throw new Error('Movie not found')
    else if ( json.Error)
      throw new Error('Smth went wrong')


    let addResult = await this.db.movies().add(new MovieModel(json))
    addResult.id = addResult['$loki']
    delete addResult['$loki']
    delete addResult['meta']
    return addResult
  }
}