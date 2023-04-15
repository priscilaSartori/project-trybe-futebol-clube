import { Router } from 'express';
import Controller from '../controllers/leaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', Controller.homeLeaderboard);
leaderboardRouter.get('/away', Controller.awayLeaderboard);
leaderboardRouter.get('/', Controller.allLeaderboard);

export default leaderboardRouter;
