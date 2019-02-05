import * as loki from 'lokijs' 
import {MovieRepository} from './movies.repository'
import {CommentRepository} from './comments.repository'

var db = new loki('test.json')

export class Repository{
    protected moviesRepo:MovieRepository
    protected commentRepo:CommentRepository

    constructor(){
        this.moviesRepo = new MovieRepository(db)
        this.commentRepo = new CommentRepository(db)
    }

    public movies(): MovieRepository{
        return this.moviesRepo
	}
	
	public comments(): CommentRepository{
        return this.commentRepo
    }


}