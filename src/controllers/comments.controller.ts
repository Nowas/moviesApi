import { Request, Response } from 'express';
import { Repository } from '../repositories';
import { CommentModel } from '../models/comment.model';

module.exports = function (db:Repository){
	function get(req: any, res: Response){  
		let movieId = req.swagger.params.id.value
		var commentData:CommentModel[] = db.comments().get(movieId)
		return res.status(200).send(commentData)
    }
    
    function add(req: any, res: Response){        	  
        var commentData:CommentModel  = new CommentModel(req.swagger.params.id.value, req.body.header, req.body.details )
		db.comments().add(commentData)
        res.status(200).send({id:commentData['$loki']})
	}
	return {
		get, 
		add
	}
  }