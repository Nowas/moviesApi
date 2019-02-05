import { Request, Response } from 'express';
import { Repository } from '../repositories';
import { MovieModel } from '../models/movie.model';

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


module.exports = function (db:Repository){
	function get(req: any, res: Response){  
		let id = req.swagger.params.id ? req.swagger.params.id.value : null          
		var movieData:MovieModel[] = db.movies().get(id)
		if( movieData.length == 0 && id)
			return res.status(404).send()
		return res.status(200).send(movieData)
    }
    
    function add(req: any, res: Response){        	  
        var movieData:MovieModel  = new MovieModel(req.body.title)
		db.movies().add(movieData)
        res.status(200).send({id:movieData['$loki']})
	}
	return {
		get, 
		add
	}
  }