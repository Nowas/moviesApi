export class CommentModel {  
	header:string
	details?:string 
	id?:number
	
     
    constructor(header:string, details:string) { 
		this.header = header 
		this.details = details 
    }  
 }