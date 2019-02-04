
import {Request, Response} from "express";
import { Repository } from "src/repositories";
import { MoviesController } from "../controllers/movies.controller.ts";

export class moviesRoutes {       
    protected db:Repository
    protected movieController:MoviesController

    constructor(db:Repository){
        this.db = db
        this.movieController = new MoviesController(this.db)
    }

    public routes(app): void {          
        app.route('/movies')
            .get(this.movieController.get(this.db))  
            .post(this.movieController.addMovie(this.db))  
    }
}