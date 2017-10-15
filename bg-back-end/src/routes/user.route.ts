import { BaseRoute } from './base-route';
import { UserBl } from '../business-logic/user.bl';
import { NextFunction, Router, Response, Request } from 'express';
import { UserModel } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

export class UserRoute extends BaseRoute {

    static readonly publicRoute = '/public/user';
    private userBl: UserBl;
    private saltRound = 10;

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        console.log('[UserRoute::create] Creating user route.');
        const userRoute = new UserRoute();

        // add home page route
        router.post(`${UserRoute.publicRoute}/register`, (req: Request, res: Response) => {
            userRoute.insertUser(req, res);
        });

        router.post(`${UserRoute.publicRoute}/login`, (req: Request, res: Response) => {
            userRoute.authenticate(req, res);
        });

        router.get(`${UserRoute.publicRoute}/logout`, (req: Request, res: Response, next: NextFunction) => {
            userRoute.logout(req, res, next);
        });

        router.get(`${UserRoute.publicRoute}/encrypt`, (req: Request, res: Response) => {
            userRoute.encryptAll(req, res);
        });

        router.get(`${UserRoute.publicRoute}/check`, (req: Request, res: Response) => {
            userRoute.isAuthenticate(req, res);
        });

        router.get(`${UserRoute.publicRoute}/:id`, (req: Request, res: Response) => {
            userRoute.getUser(req, res);
        });

        router.get(`${UserRoute.publicRoute}`, (req: Request, res: Response) => {
            userRoute.getUsers(req, res);
        });
    }

    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
     */
    constructor() {
        super();
        this.userBl = new UserBl();
    }

    /**
     * Get all informations to display active menu informations.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public insertUser(req: Request, res: Response) {
        console.log(req);
        const user = req.body['user'] as UserModel;
        this.userBl.addUser(user).then(id => {
            user.id = id;
            res.json(_.omit(user, ['password']));
        });
    }

    public getUser(req: Request, res: Response) {
        this.userBl.getUser(+req.params['id']).then(user => {
            res.json(user);
        });
    }

    public authenticate(req: Request, res: Response) {
        const mail = req.body['mail'];
        const password = req.body['password'];

        this.userBl.checkAuthentication(mail, password)
            .then(user => {
                if (user) {
                    req.session.userId = user.id;
                    // req.session.role = 'admin';
                    return res.json(user);
                } else {
                    return res.sendStatus(401);
                }
            }).catch(error => res.sendStatus(404));
    }

    public logout(req: Request, res: Response, next: NextFunction) {
        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    // console.log('logout error' + err);
                    return next(err);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    }

    public isAuthenticate(req: Request, res: Response) {
        const response = {status: false};
        console.log(req.session);
        if (req.session && req.session.userId) {
            response.status = true;
        }

        res.json(response);
    }


    // TODO remove after dev.
    public encryptAll(req: Request, res: Response) {
        this.userBl.getUsers().then(users => {
            for (const u of users) {
                u.password = bcrypt.hashSync(u.password, this.saltRound);
                this.userBl.updateUser(u).then(success => {
                    console.log((success ? 'SUCCESS' : 'ERROR') + ' : updated');
                });
            }
        }).then(() => res.json({message: 'Consult logs for further informations.'}));
    }

    public getUsers(req: Request, res: Response) {
        this.userBl.getUsers().then(users => {
            res.json(users);
        });
    }

}
