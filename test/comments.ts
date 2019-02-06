import { expect } from 'chai';
import { CommentsService } from '../src/services/comments.services';
import { MoviesService } from '../src/services/movies.services';
import { CommentModel } from '../src/models/comment.model';
import { Repository } from '../src/repositories';
require('dotenv').load()

describe('CommentService', () => {
    let db:Repository
    let movieService:MoviesService
    let commentService:CommentsService
    let movieId

    before( async () => {
        db = new Repository()
        movieService = new MoviesService(db)
        commentService = new CommentsService(db)
        let movie = await movieService.addMovieToCollection('Star Trek')
        movieId = movie.id
    })

    it('Expect to have one movie in the DB', async () => {
        var movies = await movieService.getMovies()
        expect(movies.length).to.equal(1)
    })
    
    it('Add comment to not existinf movie', async () => {
        try{
            await commentService.addCommentToMovie(-1, new CommentModel('Star Trek rules', 'I love Star Trek'))
            expect.fail(null, null, 'Movie was found')
        } catch (error) {
            expect(error.message).to.equal("Movie not found")
        }
    })

    it('Expect to add comment ot the movie', async () => {
        var comment = await commentService.addCommentToMovie(movieId, new CommentModel('Star Trek rules', 'I love Star Trek') )
        expect(comment.details).to.equal('I love Star Trek')
        expect(comment.header).to.equal('Star Trek rules')
    })
});