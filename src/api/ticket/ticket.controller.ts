import { NextFunction, Request, Response, Router } from 'express'
import * as ticketService from './ticket.service'
import { tick } from '@angular/core/testing'

const router = Router()

router.post('/', create)
router.put('/redeem', redeem)
router.get('/:id', getById)
router.get('/uuid/:uuid', getByUUID)
router.get('/', getAll)

export default router

function redeem(req: Request, res: Response, next: NextFunction) {
    const { qrString } = req.body;
    ticketService.redeem(qrString)
        .then(() => res.status(200).send())
        .catch((err) => next(err))
}

function getById(req: Request, res: Response, next: NextFunction) {
    const idTicket = parseInt(req.params['id'])
    ticketService.getById(idTicket)
        .then((ticket => res.status(200).json(ticket)))
        .catch((err) => next(err))
}

function getByUUID(req: Request, res: Response, next: NextFunction) {
    const {uuid} = req.params;
    ticketService.getByUUID(uuid)
        .then((ticket => res.status(200).json(ticket)))
        .catch((err) => next(err))
}

function getAll(req: Request, res: Response, next: NextFunction) {
    const idEvent = req.query['idEvent'] as string;
    const page = parseInt(req.query['page'] as string) || 1;
    const pageSize = parseInt(req.query['pageSize'] as string) || 10;
    console.log(idEvent);
    if(!idEvent){
        res.status(400).send('idEvent is required');
        return
    }

    Promise.all([
        ticketService.getAll(parseInt(idEvent), page, pageSize),
        ticketService.countTickets(parseInt(idEvent))
    ])
    .then(([tickets, totalTickets]) => {
        res.status(200).json({ tickets, totalTickets });
    })
    .catch((err) => next(err));
}

function create(req: Request, res: Response, next: NextFunction) {
    const ticketCreateData = req.body;
    ticketService.create(ticketCreateData)
        .then((ticket) => res.status(201).send(ticket))
        .catch((err) => next(err));
}
