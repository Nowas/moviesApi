import { CommentRepositoryModel } from 'src/models/comment.repository.model';
import { CommentModel } from 'src/models/comment.model';

export class CommentRepository{
    protected db:Loki
    protected commentCollection:Collection<CommentRepositoryModel>

    constructor(db:Loki){
        this.db = db
        this.commentCollection = this.db.addCollection('comments')
    }

    add(movieId:number, newCommentData:CommentModel){
        var comment:any = newCommentData
        comment.movieId = movieId
        return this.commentCollection.insert(comment)
    }

    get(movieId:number):CommentModel[]{
        return this.commentCollection.find({movieId:movieId})
    }


}
