import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as session from 'express-session';

import { MenuRoute } from './routes/menu.route';

import * as errorHandler from 'errorhandler';
import * as methodOverride from 'method-override';

import 'reflect-metadata';
import { ConnectionManager, getConnectionManager } from 'typeorm';
import { ConnectionManagerBl } from './business-logic/connection-manager.bl';
import * as _ from 'lodash';
import { MenuEntity } from './entyties/menu.entity';
import { SandwichEntity } from './entyties/sandwich.entity';
import { SandwichRoute } from './routes/sandwich.route';
import { ToppingRoute } from './routes/topping.route';
import { ToppingEntity } from './entyties/topping.entity';
import { BreadEntity } from './entyties/bread.entity';
import { BreadRoute } from './routes/bread.route';
import { UserEntity } from './entyties/user.entity';
import { UserRoute } from './routes/user.route';
import { OrderRoute } from './routes/order.route';
import { OrderEntity } from './entyties/order.entity';
import { BaseRoute } from './routes/base-route';

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
        // create expressjs application
        this.app = express();

        // configure application
        this.config();

        // add api
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
        let loginRouter: express.Router;
        loginRouter = express.Router();
        loginRouter.use(BaseRoute.requireLogin);
        let adminRouter: express.Router;
        adminRouter = express.Router();
        adminRouter.use(BaseRoute.requireLoginAdmin);

        // Menu request
        MenuRoute.create(router);
        SandwichRoute.create(router, loginRouter);
        ToppingRoute.create(router);
        BreadRoute.create(router);
        UserRoute.create(router, loginRouter, adminRouter);
        OrderRoute.create(router, loginRouter);

        // Use router middleware
        this.app.use('/api', [router, loginRouter, adminRouter]);
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    public config() {
        // add static paths
        // this.app.use(express.static(path.join(__dirname, 'public')));

        // use logger middlware
        this.app.use(logger('dev'));

        // use json form parser middlware
        this.app.use(bodyParser.json());

        // use query string parser middlware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        // use session to manage sessions
        this.app.use(session({
            secret: 'topping frog',
            name: 'sessionId',
            resave: true,
            saveUninitialized: false,
            cookie: {
                maxAge: 3600000
            }
        }));

        // use override middlware
        this.app.use(methodOverride());

        // Allow cross origine
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });

        // Create connection
        const connectionManager: ConnectionManager = getConnectionManager();
        const options = _.merge(ConnectionManagerBl.connexionOptions, ConnectionManagerBl.entities);

        connectionManager.create(options).connect().then(connection => {
            connection.getRepository(MenuEntity);
            connection.getRepository(SandwichEntity);
            connection.getRepository(ToppingEntity);
            connection.getRepository(BreadEntity);
            connection.getRepository(UserEntity);
            connection.getRepository(OrderEntity);
        }).catch(err => {
            console.log('Error on create connection', err);
        });

        // catch 404 and forward to error handler
        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        // error handling
        this.app.use(errorHandler());
    }

}
