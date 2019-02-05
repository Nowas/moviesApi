import { Repository } from "src/repositories";
import { MovieModel } from "src/models/movie.model";

export class MoviesService {
  protected db: Repository

  constructor(db: Repository) {
    this.db = db
  }

  async getMovies(id?: number): Promise<MovieModel[]> {
    let getResult = await this.db.movies().get(id)
    return getResult.map(el => {
      return {
        title: el.title,
        id: Number(el['$loki'])
      }
    })
  }

  async addMovieToCollection(movieData: MovieModel): Promise<MovieModel> {
    let addResult = await this.db.movies().add(movieData)
    return {
      title: addResult.title,
      id: Number(addResult['$loki'])
    }
  }
}