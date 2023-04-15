import ILeaderboard from '../interfaces/ILeaderboard';
import sequelize from '../models';
import home from '../models/homeLeaderboardModel';
import away from '../models/awayLeaderboardModel';

export default class LeaderboardService {
  static async homeLeaderboard(): Promise<ILeaderboard[]> {
    const [leaderboard] = await sequelize.query(home);
    return leaderboard as ILeaderboard[];
  }

  static async awayLeaderboard(): Promise<ILeaderboard[]> {
    const [leaderboard] = await sequelize.query(away);
    return leaderboard as ILeaderboard[];
  }
}
