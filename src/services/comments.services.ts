import { Repository } from "src/repositories";
import { CommentModel } from "src/models/comment.model";
import { MoviesService } from "./movies.services";

export class CommentsService {
  protected db: Repository
  protected movieService: MoviesService

  constructor(db: Repository) {
    this.db = db
    this.movieService = new MoviesService(db)
  }

  async getComments(movieId: number): Promise<CommentModel[]> {
    let movie = await this.movieService.getMovies(movieId)
    if (movie.length == 0)
      throw new Error('Movie Not found')
    let getResult = await this.db.comments().get(movieId)
    return getResult.map(el => {
      return {
        header: el.header,
        details: el.details,
        id: el['$loki']
      }
    })

  }

  async addCommentToMovie(movieId: number, commentData: CommentModel): Promise<CommentModel> {
    let movie = await this.movieService.getMovies(movieId)
    if (movie.length == 0)
      throw new Error('Movie Not found')
    if (movie.length != 1)
      throw new Error('Movie not unique')
    let addResult = await this.db.comments().add(movieId, commentData)
    return {
      header: addResult.header,
      details: addResult.details,
      id: addResult['$loki']
    }

  }
}