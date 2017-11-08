import { NextFunction, Request, Response } from 'express';
import { UserEntity } from '../entyties/user.entity';

/**
 * Constructor
 *
 * @class BaseRoute
 */
export class BaseRoute {

    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    constructor() {
    }


    // --------------- MIDDLEWARE ---------------
    public static requireLogin(req: Request, res: Response, next: NextFunction) {
        console.log(req.session);
        if (req.session && req.session.user && req.session.cookie.originalMaxAge > 0) {
            return next();
        } else {
            const err = new Error('You must be logged in to view this page.');
            return next(err);
        }
    }

    public static requireLoginAdmin(req: Request, res: Response, next: NextFunction) {
        if (req.session && req.session.user
            && req.session.user.role === UserEntity.roles[1]
            && req.session.cookie.originalMaxAge > 0) {
            return next();
        } else {
            const err = new Error('You must be admin in to view this page.');
            return next(err);
        }
    }
}
