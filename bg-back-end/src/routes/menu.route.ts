import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './base-route';

import  mysql = require('mysql');

import _ = require('lodash');
import { Menu } from '../models/menu.model';
import { Sandwich } from '../models/sandwich.model';


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
        const getMenuSql =
            'SELECT m.*\n' +
            'FROM menu AS m\n' +
            'WHERE m.menu_is_active';

        const getSandwichesSql =
            'SELECT\n' +
            '  s.*,\n' +
            '  som.som_order_number as sandwich_order_number,\n' +
            '  (SELECT truncate(b.bread_price + SUM(t.topping_price), 2)\n' +
            '   FROM sandwich AS s2\n' +
            '     LEFT JOIN bread AS b\n' +
            '       ON s2.sandwich_bread_id = b.bread_id\n' +
            '     LEFT JOIN topping_on_sandwich AS tos\n' +
            '       ON tos.tos_sandwich_id = s2.sandwich_id\n' +
            '     LEFT JOIN topping AS t\n' +
            '       ON t.topping_id = tos.tos_topping_id\n' +
            '   WHERE s2.sandwich_id = s.sandwich_id) AS sandwich_price\n' +
            'FROM menu AS m\n' +
            '  LEFT JOIN sandwich_on_menu AS som\n' +
            '    ON som.som_menu_id = m.menu_id\n' +
            '  LEFT JOIN sandwich AS s\n' +
            '    ON s.sandwich_id = som.som_sandwich_id\n' +
            'WHERE m.menu_is_active';

        const con = mysql.createConnection(BaseRoute.connexionOptions);
        con.connect(err => {
            if (err) throw err;
            console.log('Connected');
            con.query(getSandwichesSql, (err, sResult) => {
                if (err) throw err;
                con.query(getMenuSql, (err, mResult) => {
                    const sandwiches = _.map(sResult, s => Sandwich.fromDbRow(s));
                    const menu = Menu.fromDbRow(mResult[0], sandwiches);
                    res.json(menu);
                });
            });
        });
    }
}
