import { Request, Response } from 'express';
import { Repository } from '../repositories';
import { CommentModel } from '../models/comment.model';
import { CommentsService } from '../services/comments.services';

module.exports = function (db: Repository) {
	let commentService = new CommentsService(db)


	async function get(req: any, res: Response) {
		try {
			let movieId = req.swagger.params.id.value
			let comments = await commentService.getComments(movieId)
			return res.status(200).send(comments)
		} catch (error) {
			if (error.message == 'Movie not found')
				return res.status(404).send(error.message)

			return res.status(500).send()
		}
	}

	async function add(req: any, res: Response) {
		try {
			let movieId = req.swagger.params.id.value
			var commentData: CommentModel = new CommentModel(req.body.header, req.body.details)
			var addResult = await commentService.addCommentToMovie(movieId, commentData)
			res.status(200).send(addResult)
		} catch (error) {
			if (error.message == 'Movie not found')
				return res.status(404).send(error.message)

			if (error.message == 'Movie not unique')
				return res.status(409).send(error.message)
				
			return res.status(500).send()
		}
	}
	return {
		get,
		add
	}
}