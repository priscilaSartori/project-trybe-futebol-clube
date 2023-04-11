import { Router } from 'express';
import Service from '../services/usersServices';
import Controller from '../controllers/usersController';
import Model from '../models/usersModel';
import validateLogin from '../middleware/validateLogin';
import validateToken from '../middleware/validateToken';

const usersService = new Service(Model);
const usersController = new Controller(usersService);

const usersRouter = Router();
usersRouter.post('/', validateLogin.validate, usersController.login);
usersRouter.get('/role', validateToken.validate, usersController.role);

export default usersRouter;
