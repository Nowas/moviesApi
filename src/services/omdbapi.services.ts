import { Repository } from "../repositories";
import { MovieModel } from "../models/movie.model";
import { resolve } from "dns";
var querystring = require('querystring');
var fetch = require("node-fetch");

export class OmdbapiService {
  static async getMovieDetails(title: string): Promise<MovieModel> {
    const response = await fetch(`http://www.omdbapi.com/?t=${querystring.escape(title)}&apikey=${process.env.MOVIE_API_KEY}`);
    const json = await response.json();
    if( json.Error == 'Movie not found!')
      throw new Error('Movie not found')
    else if ( json.Error)
      throw new Error('Smth went wrong')
    return json
  }
}