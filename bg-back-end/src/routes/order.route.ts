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
    static readonly privateRoute = '/private/order';
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
        const orderRoute = new OrderRoute();


        // loginRouter.route(`${OrderRoute.privateRoute}/:id`)
        router.route(`${OrderRoute.privateRoute}/:id`)
            .get((req: Request, res: Response) => {
                // orderRoute.getOrdersFromUser(req, res);
                orderRoute.getOrder(req, res);
            })
            .put((req: Request, res: Response) => {
                orderRoute.updateOrder(req, res);
            });

        // TODO Uncomment after login integration
        // loginRouter.post(OrderRoute.publicRoute, (req: Request, res: Response) => {
        router.post(OrderRoute.privateRoute, (req: Request, res: Response) => {
            new OrderRoute().createOrder(req, res);
        });

        router.get(OrderRoute.publicRoute, (req: Request, res: Response) => {
            orderRoute.getOrders(req, res);
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

    public getOrder(req: Request, res: Response) {
        this.orderBl.getOrder(+req.params['id'])
            .then(order => res.json(order))
            .catch(err => res.json(err));
    }

    public updateOrder(req: Request, res: Response) {
        const orderId = +req.params['id'];
        const status = req.body['status'];
        this.orderBl.updateOrder(orderId, status)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }
}
