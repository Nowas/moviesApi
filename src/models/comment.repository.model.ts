export class CommentRepositoryModel {  
	header:string
	details?:string 
	movieId: number
	id?:number
	
     
    constructor(movieId:number, header:string, details:string) { 
		this.movieId = movieId 
		this.header = header 
		this.details = details 
    }  
 }