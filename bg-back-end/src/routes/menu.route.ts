import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './base-route';

import  mysql = require('mysql');


/**
 * / route
 *
 * @class User
 */
export class MenuRoute extends BaseRoute {

    static readonly publicRoute = '/public';

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        //log
        console.log('[IndexRoute::create] Creating index route.');

        //add home page route
        router.get(MenuRoute.publicRoute + '/menu', (req: Request, res: Response, next: NextFunction) => {
            new MenuRoute().getPublicMenu(req, res, next);
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
    public getPublicMenu(req: Request, res: Response, next: NextFunction) {
        const sql = 'select s.*\n' +
            'from menu as m\n' +
            '\tleft join sandwich_on_menu as som\n' +
            '\t\ton som.som_menu_id = m.menu_id\n' +
            '\tleft join sandwich as s\n' +
            '\t\ton s.sandwich_id = som.som_sandwich_id\n' +
            'where m.menu_is_active';
        const con = mysql.createConnection(BaseRoute.connexionOptions);
        con.connect(err => {
            if (err) throw err;
            console.log('Connected');
            con.query(sql, (err, result) => {
                if (err) throw err;
                console.log(result);
                res.json({sandwiches: result});
            });
        });
    }
}
