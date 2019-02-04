import * as express from 'express'
import * as bodyParser from "body-parser";
import { moviesRoutes } from "./routes/movies.routes";
import { Repository } from './repositories';

class App {
  public app
  protected db = new Repository()
  public routePrv: moviesRoutes = new moviesRoutes(this.db);

  constructor () {
    this.app = express()
    this.mountRoutes()
    this.routePrv.routes(this.app);     

  }

  private mountRoutes (): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app
