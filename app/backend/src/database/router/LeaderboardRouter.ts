import { Router } from 'express';
import Controller from '../controllers/leaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', Controller.getHomeLeaderboard);

export default leaderboardRouter;
