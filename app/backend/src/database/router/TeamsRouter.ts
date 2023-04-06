import { Router } from 'express';
import Service from '../services/teamsService';
import Controller from '../controllers/teamsController';
import Model from '../models/teamsModel';

const teamsService = new Service(Model);
const teamsController = new Controller(teamsService);

const teamsRouter = Router();
teamsRouter.get('/', (req, res, next) => teamsController.getAll(req, res, next));
teamsRouter.get('/:id', (req, res, next) => teamsController.getById(req, res, next));

export default teamsRouter;
