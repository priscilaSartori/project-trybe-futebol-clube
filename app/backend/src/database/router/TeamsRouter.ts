import { Router } from 'express';
import Service from '../services/teamsService';
import Controller from '../controllers/teamsController';
import Model from '../models/teamsModel';

const teamsService = new Service(Model);
const teamsController = new Controller(teamsService);

const teamsRouter = Router();
teamsRouter.get('/', (req, res) => teamsController.getAll(req, res));
teamsRouter.get('/:id', (req, res) => teamsController.getById(req, res));

export default teamsRouter;
