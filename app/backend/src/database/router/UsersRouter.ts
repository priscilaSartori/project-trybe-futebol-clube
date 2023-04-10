import { Router } from 'express';
import Service from '../services/usersService';
import Controller from '../controllers/usersController';
import Model from '../models/usersModel';
import validateToken from '../middleware/validateToken';

const usersService = new Service(Model);
const usersController = new Controller(usersService);

const usersRouter = Router();
usersRouter.post('/', validateToken.validate, usersController.login);

export default usersRouter;
