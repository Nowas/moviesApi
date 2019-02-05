export class MovieModel {  
   year?:string
   actors?: string
   director?:string
   awards?:string
   title:string;
   id?:number
     
    constructor(omdbapiResp:any) { 
      this.title = omdbapiResp.Title 
      this.year = omdbapiResp.Year 
      this.director = omdbapiResp.Director 
      this.awards = omdbapiResp.Awards 
      this.title = omdbapiResp.Title 
   }  
 }