import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/matchesService';
import TeamService from '../services/teamsService';

class MatchesController {
  constructor(private matchesService: MatchesService, private TeamsService: TeamService) { }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { inProgress } = req.query;
    if (inProgress) {
      const matchesInProgress = await this.matchesService.getInProgress(inProgress as string);
      res.status(200).json(matchesInProgress);
    }
    try {
      const matches = await this.matchesService.getAll();
      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      await this.matchesService.update(Number(id));
      res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };

  public updateMatches = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    try {
      await this.matchesService.updateMatches(Number(id), homeTeamGoals, awayTeamGoals);
      res.status(200).json({ });
    } catch (error) {
      next(error);
    }
  };

  public createMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newMatch = req.body;
      const matches = await this.matchesService.createMatches(newMatch);
      res.status(201).json(matches);
    } catch (error) {
      next(error);
    }
  };
}

export default MatchesController;
