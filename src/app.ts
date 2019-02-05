import * as express from 'express'
import * as bodyParser from "body-parser";
import { Repository } from './repositories';
var swaggerTools = require('swagger-tools');
var swaggerDocument = require('../api-docs/swagger.json');

class App {
	public app
	protected db = new Repository()

	constructor() {
		this.app = express()
		this.mountRoutes()
	}

	private mountRoutes(): void {
		// swaggerRouter configuration
		var options = {
			controllers: this.builControllers(require('./controllers')(this.db)),
			useStubs: true
		};
		let self = this
		// Initialize the Swagger middleware
		swaggerTools.initializeMiddleware(swaggerDocument, function (middleware) {
			// Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
			self.app.use(middleware.swaggerMetadata());
			// Validate Swagger requests
			self.app.use(middleware.swaggerValidator());
			// Route validated requests to appropriate controller
			self.app.use(middleware.swaggerRouter(options));
			// Serve the Swagger documents and Swagger UI
			self.app.use(middleware.swaggerUi({
				swaggerUi: '/console',
				swaggerUiDir: 'public/swagger-ui/',
				apiDocs: '/console/api-docs'
			}))
		})
		this.app.use(express.static('public'))
		// support application/json type post data
		this.app.use(bodyParser.json());
		//support application/x-www-form-urlencoded post data
		this.app.use(bodyParser.urlencoded({ extended: false }));
	}

	private  builControllers(controllers) {
        var handlers = {}
        for (var controllerName in controllers) {
            var controller = controllers[controllerName]
            for (var handler in controller) {
                handlers[controllerName + '_' + handler] = controller[handler]
            }
        }
        return handlers
    }
}

export default new App().app