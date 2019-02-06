import { expect } from 'chai';
import { MoviesService } from '../src/services/movies.services';
import { MovieModel } from '../src/models/movie.model';
import { Repository } from '../src/repositories';
require('dotenv').load()

describe('MovieService', () => {
    let db:Repository
    let movieService:MoviesService

    before( async () => {
        db = new Repository()
        movieService = new MoviesService(db)
    })

    it('Get for empty db reurn empty array', async () => {
        var movies = await movieService.getMovies()
        expect(movies.length).to.equal(0)
    })
    
    it('Expect to throw error on movie not found', async () => {
        try{
            await movieService.addMovieToCollection('Star Trek - bad title with typo')
            expect.fail(null, null, 'Movie was found')
        } catch (error) {
            expect(error.message).to.equal("Movie not found")
        }
    })

    it('Expect to add new movie', async () => {
        let movie = await movieService.addMovieToCollection('Star Trek')
        expect(movie.title).to.equal("Star Trek")
        expect(movie.year).to.equal("2009")
        expect(movie.director).to.equal("J.J. Abrams")
        expect(movie.awards).to.equal("Won 1 Oscar. Another 23 wins & 92 nominations.")
    })

    it('Reject duplicated movie to throw error on movie not found', async () => {
        try{
            await movieService.addMovieToCollection('Star Trek')
            expect.fail(null, null, 'Movie was added')
        } catch (error) {
            expect(error.message).to.equal("Movie already in DB")
        }
    })

});