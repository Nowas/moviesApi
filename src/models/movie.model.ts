export class MovieModel {  
      title:string; 
      id?:number
     
    constructor(title:string) { 
       this.title = title 
    }  

    display_name():void { 
       console.log("Movie title is:   "+this.title) 
    } 
 }