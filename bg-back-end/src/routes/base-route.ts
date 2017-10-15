import { NextFunction, Request, Response } from 'express';

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
    public requireLogin(req: Request, res: Response, next: NextFunction) {
        if (req.session && req.session.userId) {
            return next();
        } else {
            const err = new Error('You must be logged in to view this page.');
            return next(err);
        }
    }
}
