import { Router } from 'express';
import Service from '../services/usersService';
import Controller from '../controllers/usersController';
import Model from '../models/usersModel';

const usersService = new Service(Model);
const usersController = new Controller(usersService);

const usersRouter = Router();
usersRouter.get('/', (req, res, next) => usersController.getAll(req, res, next));

export default usersRouter;
