import {CommentModel} from '../models/comment.model'

export class CommentRepository{
    protected db:Loki
    protected commentCollection:Collection<CommentModel>

    constructor(db:Loki){
        this.db = db
        this.commentCollection = this.db.addCollection('comments')
    }

    add(newMovieData:CommentModel){
        return this.commentCollection.insert(newMovieData)
    }

    get(movieId:number):CommentModel[]{
        return this.commentCollection.find({movieId:movieId})
    }


}
