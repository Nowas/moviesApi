import * as loki from 'lokijs' 
import {MovieRepository} from './movies.repository'

var db = new loki('test.json')

export class Repository{
    protected moviesRepo:MovieRepository

    constructor(){
        this.moviesRepo = new MovieRepository(db)
    }

    public movies(): MovieRepository{
        return this.moviesRepo
    }


}