import { Request, Response, Router } from 'express';
import { BaseRoute } from './base-route';

import { OrderBl } from '../business-logic/order.bl';
import { OrderModel } from '../models/order.model';
import { UserBl } from '../business-logic/user.bl';
import { UserModel } from '../models/user.model';


/**
 * / route
 *
 * @class User
 */
export class OrderRoute extends BaseRoute {

    static readonly publicRoute = '/public/order';
    private orderBl: OrderBl;
    private userBl: UserBl;

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(router: Router, loginRouter: Router) {
        console.log('[OrderRoute::create] Creating order route.');

        // add home page route
        router.get(OrderRoute.publicRoute, (req: Request, res: Response) => {
            new OrderRoute().getOrders(req, res);
        });


        router.get(`${OrderRoute.publicRoute}/:id`, (req: Request, res: Response) => {
            new OrderRoute().getOrdersFromUser(req, res);
        });

        // TODO Uncomment after login integration
        // loginRouter.post(OrderRoute.publicRoute, (req: Request, res: Response) => {
        router.post(OrderRoute.publicRoute, (req: Request, res: Response) => {
            new OrderRoute().createOrder(req, res);
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

    public createOrder(req: Request, res: Response) {
        this.userBl.getUser(1).then(user => {
            const currentUser = user as UserModel;
            const order = req.body['order'] as OrderModel;

            this.orderBl.createOrder(order, currentUser)
                .then(orderResult => res.json(orderResult))
                .catch(err => res.json(err));
        }).catch(err => console.log(err));
        // const user = req.session.user;
        // const order = req.body['order'] as OrderModel;
        // this.orderBl.createOrder(order, user)
        //     .then(orderResult => res.json(orderResult))
        //     .catch(err => res.json(err));
    }
}
