import {MovieModel} from '../models/movie.model'

export class MovieRepository{
    protected db:Loki
    protected moviesCollection:Collection<MovieModel>

    constructor(db:Loki){
        this.db = db
        this.moviesCollection = this.db.addCollection('movies')
    }

    add(newMovieData:MovieModel){
        return this.moviesCollection.insert(newMovieData)
    }

    get(title?:string):MovieModel[]{
        if(!title)
           return this.moviesCollection.find()
        return this.moviesCollection.find({title:title})
    }


}