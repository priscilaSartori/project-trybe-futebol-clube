import { Router } from 'express';
import Service from '../services/matchesService';
import Controller from '../controllers/matchesController';
import Model from '../models/matchesModel';
import TeamsModel from '../models/teamsModel';
import validateToken from '../middleware/validateToken';

const matchesService = new Service(Model, TeamsModel);
const matchesController = new Controller(matchesService);

const matchesRouter = Router();
matchesRouter.get('/', matchesController.getAll);
matchesRouter.patch('/:id/finish', validateToken.validate, matchesController.update);
matchesRouter.patch('/:id', validateToken.validate, matchesController.updateMatches);

export default matchesRouter;
