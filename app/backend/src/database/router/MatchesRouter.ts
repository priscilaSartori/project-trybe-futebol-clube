import { Router } from 'express';
import Service from '../services/matchesService';
import Controller from '../controllers/matchesController';
import Model from '../models/matchesModel';
import TeamsModel from '../models/teamsModel';
import validateToken from '../middleware/validateToken';
import TeamsService from '../services/teamsService';
import ValidateMatches from '../middleware/validateMatches';

const matchesRouter = Router();
const matchesService = new Service(Model, TeamsModel);
const teamsService = new TeamsService(TeamsModel);
const matchesController = new Controller(matchesService, teamsService);
const validateMatches = new ValidateMatches(teamsService);

matchesRouter.get('/', matchesController.getAll);
matchesRouter.patch('/:id/finish', validateToken.validate, matchesController.update);
matchesRouter.patch('/:id', validateToken.validate, matchesController.updateMatches);
matchesRouter.post(
  '/',
  validateToken.validate,
  validateMatches.validate,
  matchesController.createMatches,
);

export default matchesRouter;
