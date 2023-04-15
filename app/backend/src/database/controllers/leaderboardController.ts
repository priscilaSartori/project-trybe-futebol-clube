import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  static async homeLeaderboard(_req: Request, res: Response) {
    const leaderboard = await LeaderboardService.homeLeaderboard();
    return res.status(200).json(leaderboard);
  }

  static async awayLeaderboard(_req: Request, res: Response) {
    const leaderboard = await LeaderboardService.awayLeaderboard();
    return res.status(200).json(leaderboard);
  }

  static async allLeaderboard(_req: Request, res: Response) {
    const leaderboard = await LeaderboardService.allLeaderboard();
    return res.status(200).json(leaderboard);
  }
}
