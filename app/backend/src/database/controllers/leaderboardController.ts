import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  static async getHomeLeaderboard(_req: Request, res: Response) {
    const leaderboard = await LeaderboardService.getHomeLb();
    return res.status(200).json(leaderboard);
  }
}
