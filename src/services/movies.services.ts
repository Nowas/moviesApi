import { Repository } from "..//repositories";
import { MovieModel } from "../models/movie.model";
import { OmdbapiService } from "./omdbapi.services";

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

    var movieDetails = await OmdbapiService.getMovieDetails(title)
    let addResult = await this.db.movies().add(new MovieModel(movieDetails))
    addResult.id = addResult['$loki']
    delete addResult['$loki']
    delete addResult['meta']
    return addResult
  }
}