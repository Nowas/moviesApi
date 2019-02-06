import { expect } from 'chai';
import { OmdbapiService } from '../src/services/omdbapi.services';
import { Repository } from '../src/repositories';
import { MovieModel } from '../src/models/movie.model';
require('dotenv').load()

describe('OmdbapiService', () => {
    it('Will fetch proper data for existing movi title', async () => {
        const movieDetails  = await OmdbapiService.getMovieDetails('Star Trek')
        const movieModel = new MovieModel(movieDetails)
        expect(movieModel.title).to.equal("Star Trek")
        expect(movieModel.year).to.equal("2009")
        expect(movieModel.director).to.equal("J.J. Abrams")
        expect(movieModel.awards).to.equal("Won 1 Oscar. Another 23 wins & 92 nominations.")
    });
    
    it('Expect to throw error on movie not found', async () => {
        try{
            await OmdbapiService.getMovieDetails('Star Trek - bad title with typo')
            expect.fail(null, null, 'Movie data was found')
        } catch (error) {
            expect(error.message).to.equal("Movie not found")

        }
    });

});