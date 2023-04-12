import { Router } from 'express';
import Service from '../services/matchesService';
import Controller from '../controllers/matchesController';
import Model from '../models/matchesModel';
import TeamsModel from '../models/teamsModel';

const matchesService = new Service(Model, TeamsModel);
const matchesController = new Controller(matchesService);

const matchesRouter = Router();
matchesRouter.get('/', matchesController.getAll);

export default matchesRouter;
