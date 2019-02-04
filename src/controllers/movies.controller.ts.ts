import { Request, Response } from 'express';
import { Repository } from '../repositories';
import { MovieModel } from '../models/movie.model';

export class MoviesController{
    protected db:Repository

    constructor(db:Repository){
        this.db = db
    }
    get(db){}
        return (req: Request, res: Response) => {                
            var movieData:MovieModel[] = db.movies().get(req.params.title)
            res.status(200).send(movieData)
        }
    }
    
    addMovie(db) {
       return (req: Request, res: Response) => {          
        var movieData:MovieModel = new MovieModel(req.params.title)
        db.movies().add(movieData)
        res.status(200).send(movieData)
        }
    }
}