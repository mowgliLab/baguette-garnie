import { Request, Response, Router } from 'express';
import { BaseRoute } from './base-route';
import { BreadBl } from '../business-logic/bread.bl';


/**
 * / route
 *
 * @class User
 */
export class BreadRoute extends BaseRoute {

    static readonly publicRoute = '/public/bread';
    private breadBl: BreadBl;

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        console.log('[BreadRoute::create] Creating bread route.');
        const breadRoute = new BreadRoute();

        router.get(`${BreadRoute.publicRoute}`, (req: Request, res: Response) => {
            breadRoute.getBreads(req, res);
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
        this.breadBl = new BreadBl();
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
    public getBreads(req: Request, res: Response) {
        this.breadBl.getBreads()
            .then(breads => {
                res.json(breads);
            });
    }
}
