import { Request, Response, Router } from 'express';
import { BaseRoute } from './base-route';
import { SandwichBl } from '../business-logic/sandwich.bl';


/**
 * / route
 *
 * @class User
 */
export class SandwichRoute extends BaseRoute {

    static readonly publicRoute = '/public/sandwich';
    private sandwichBl: SandwichBl;

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        console.log('[SandwichRoute::create] Creating sandwich route.');

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
}
