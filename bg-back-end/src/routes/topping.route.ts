import { Request, Response, Router } from 'express';
import { BaseRoute } from './base-route';
import { ToppingBl } from '../business-logic/topping.bl';


/**
 * / route
 *
 * @class User
 */
export class ToppingRoute extends BaseRoute {

    static readonly publicRoute = '/public/topping';
    private toppingBl: ToppingBl;

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        console.log('[ToppingRoute::create] Creating topping route.');
        const toppingRoute = new ToppingRoute();

        router.get(`${ToppingRoute.publicRoute}`, (req: Request, res: Response) => {
            toppingRoute.getToppings(req, res);
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
        this.toppingBl = new ToppingBl();
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
    public getToppings(req: Request, res: Response) {
        this.toppingBl.getToppings()
            .then(toppings => {
                res.json(toppings);
            });
    }
}
