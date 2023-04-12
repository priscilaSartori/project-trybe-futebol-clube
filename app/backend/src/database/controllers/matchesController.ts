import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/matchesService';

class MatchesController {
  constructor(private matchesService: MatchesService) { }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const matches = await this.matchesService.getAll();
      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };

  public getInProgress = async (req: Request, res: Response, next: NextFunction) => {
    const { inProgress } = req.query;
    try {
      if (inProgress) {
        const matchesInProgress = await this.matchesService.getInProgress(inProgress as string);
        res.status(200).json(matchesInProgress);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default MatchesController;
