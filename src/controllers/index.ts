import { Repository } from "../repositories";

module.exports = function(db:Repository){
    return {
        comments: require("./comments.controller")(db),
        movies: require("./movies.controller")(db)
    }
}
