import { NextFunction, Request, Response, Router } from 'express'
import * as eventService from './event.service'

const router = Router()

router.get('/:id', getById)

export default router

function getById(req: Request, res: Response, next: NextFunction) {
    const idEvent = parseInt(req.params['id'])
    eventService.getById(idEvent)
        .then((event => res.status(200).json(event)))
        .catch((err) => next(err));
}
