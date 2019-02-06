import * as loki from 'lokijs' 
import {MovieRepository} from './movies.repository'
import {CommentRepository} from './comments.repository'


export class Repository{
    protected moviesRepo:MovieRepository
    protected commentRepo:CommentRepository
    protected db: any

    constructor(){
        this.db = new loki('test.json')
        this.moviesRepo = new MovieRepository(this.db)
        this.commentRepo = new CommentRepository(this.db)
    }

    public movies(): MovieRepository{
        return this.moviesRepo
	}
	
	public comments(): CommentRepository{
        return this.commentRepo
    }


}