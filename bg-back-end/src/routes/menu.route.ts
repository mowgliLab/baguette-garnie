import { Request, Response, Router } from 'express';
import { BaseRoute } from './base-route';

import { MenuBl } from '../business-logic/menu.bl';


/**
 * / route
 *
 * @class User
 */
export class MenuRoute extends BaseRoute {

    static readonly publicRoute = '/public/menu';
    private menuBl: MenuBl;

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        console.log('[MenuRoute::create] Creating menu route.');

        // add home page route
        router.get(MenuRoute.publicRoute, (req: Request, res: Response) => {
            new MenuRoute().getPublicMenu(req, res);
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
        this.menuBl = new MenuBl();
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
    public getPublicMenu(req: Request, res: Response) {
        this.menuBl.getActiveMenu()
            .then(menu => {
                res.json(menu);
            });
    }
}
