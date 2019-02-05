import { Request, Response } from 'express';
import { Repository } from '../repositories';
import { MovieModel } from '../models/movie.model';
import { MoviesService } from '../services/movies.services';

// export class MoviesController{
//     protected db:Repository

//     constructor(db:Repository){
//         this.db = db
//     }
//     public get(req: Request, res: Response){            
// 		var movieData:MovieModel[] = this.db.movies().get(req.params.title)
// 		res.status(200).send(movieData)
//     }

//     public addMovie(req: Request, res: Response){          
//         var movieData:MovieModel = new MovieModel(req.params.title)
//         this.db.movies().add(movieData)
//         res.status(200).send(movieData)
//     }
// }


module.exports = function (db: Repository) {
	let movieService = new MoviesService(db)

	async function get(req: any, res: Response) {
		try {
			let id = req.swagger.params.id ? req.swagger.params.id.value : null
			let movies = await movieService.getMovies(id)
			if (movies.length == 0 && id)
				return res.status(404).send()
			return res.status(200).send(movies)
		} catch (error) {
			return res.status(500).send()
		}
	}

	async function add(req: any, res: Response) {
		try {
			var addResult = await movieService.addMovieToCollection(new MovieModel(req.body.title))
			res.status(200).send(addResult)
		} catch (error) {
			return res.status(500).send()

		}
	}
	return {
		get,
		add
	}
}