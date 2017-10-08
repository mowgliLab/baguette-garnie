import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";

import { MenuRoute } from './routes/menu.route';

import * as errorHandler from 'errorhandler';
import * as methodOverride from 'method-override';

import 'reflect-metadata';
import { MenuEntity } from './entyties/menu.entity';
import { ConnectionManagerBl } from './business-logic/connection-manager.bl';
import { SandwichEntity } from './entyties/sandwich.entity';
import { UserEntity } from './entyties/user.entity';

/**
 * The server.
 *
 * @class Server
 */
export class Server {

    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.config();
        
        //add api
        this.api();
    }

    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    public api() {
        // Create a router to handle api request
        let router: express.Router;
        router = express.Router();

        // Menu request
        MenuRoute.create(router);

        // Use router middleware
        this.app.use('/api', router);
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    public config() {
        //add static paths
        this.app.use(express.static(path.join(__dirname, "public")));

        //use logger middlware
        this.app.use(logger("dev"));

        //use json form parser middlware
        this.app.use(bodyParser.json());

        //use query string parser middlware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        //use cookie parser middleware
        this.app.use(cookieParser("SECRET_GOES_HERE"));

        //use override middlware
        this.app.use(methodOverride());

        // Allow cross origine
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.log('manage headers');
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        //catch 404 and forward to error handler
        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());
    }

}