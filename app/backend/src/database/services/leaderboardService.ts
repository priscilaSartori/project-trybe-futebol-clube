import ILeaderboard from '../interfaces/ILeaderboard';
import sequelize from '../models';
import home from '../models/homeLeaderboardModel';

export default class LeaderboardService {
  static async getHomeLb(): Promise<ILeaderboard[]> {
    const [leaderboard] = await sequelize.query(home);
    return leaderboard as ILeaderboard[];
  }
}
