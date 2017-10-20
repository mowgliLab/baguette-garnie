import { Request, Response, Router } from 'express';
import { BaseRoute } from './base-route';

import { OrderBl } from '../business-logic/order.bl';


/**
 * / route
 *
 * @class User
 */
export class OrderRoute extends BaseRoute {

    static readonly publicRoute = '/public/order';
    private orderBl: OrderBl;

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        console.log('[OrderRoute::create] Creating order route.');

        // add home page route
        router.get(OrderRoute.publicRoute, (req: Request, res: Response) => {
            new OrderRoute().getOrders(req, res);
        });


        router.get(`${OrderRoute.publicRoute}/:id`, (req: Request, res: Response) => {
            new OrderRoute().getOrdersFromUser(req, res);
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
        this.orderBl = new OrderBl();
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
    public getOrders(req: Request, res: Response) {
        this.orderBl.getOrders()
            .then(orders => res.json(orders))
            .catch(err => res.json(err));
    }

    public getOrdersFromUser(req: Request, res: Response) {
        this.orderBl.getOrdersForUser(+req.params['id'])
            .then(orders => res.json(orders))
            .catch(err => res.json(err));
    }

    public addOrder(req: Request, res: Response) {
        // Add a new order to the current user.
        // Get user from session
        // Link User and Order
        // Compute unit prices for rows
        // Send to DB
    }
}
