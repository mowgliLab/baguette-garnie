import { Request, Response, Router } from 'express';
import { BaseRoute } from './base-route';
import { SandwichBl } from '../business-logic/sandwich.bl';
import { UserBl } from '../business-logic/user.bl';
import { SandwichModel } from '../models/sandwich.model';
import { UserModel } from '../models/user.model';


/**
 * / route
 *
 * @class User
 */
export class SandwichRoute extends BaseRoute {

    static readonly publicRoute = '/public/sandwich';
    static readonly privateRoute = '/private/sandwich';
    private sandwichBl: SandwichBl;
    private userBl: UserBl;

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(router: Router, loginRouter: Router) {
        console.log('[SandwichRoute::create] Creating sandwich route.');

        // TODO Uncomment after login integration
        // loginRouter.post(`${SandwichRoute.privateRoute}/custom`, (req: Request, res: Response) => {
        router.post(`${SandwichRoute.privateRoute}/custom`, (req: Request, res: Response) => {
            new SandwichRoute().createCustomSandwich(req, res);
        });

        router.get(`${SandwichRoute.publicRoute}/:id`, (req: Request, res: Response) => {
            new SandwichRoute().getSandwich(req, res);
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
        this.sandwichBl = new SandwichBl();
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
    public getSandwich(req: Request, res: Response) {
        this.sandwichBl.getSandwich(+req.params['id'])
            .then(sandwich => {
                res.json(sandwich);
            });
    }

    public createCustomSandwich(req: Request, res: Response) {
        // const currentUser = req.session.user;
        const sandwich = req.body['sandwich'] as SandwichModel;
        console.log(sandwich);

        this.userBl.getUser(1).then(user => {
            const currentUser = user as UserModel;
            console.log(currentUser);

            this.sandwichBl.saveCustomSandwich(sandwich, currentUser).then(result => {
                res.json(result);
            }).catch(err => res.json(err));
        });
    }
}
