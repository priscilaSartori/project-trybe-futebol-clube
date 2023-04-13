import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';
import TeamService from '../services/teamsService';

class MatchesController {
  constructor(private matchesService: MatchesService, private TeamsService: TeamService) { }

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress) {
      const matchesInProgress = await this.matchesService.getInProgress(inProgress as string);
      res.status(200).json(matchesInProgress);
    }
    const matches = await this.matchesService.getAll();
    res.status(200).json(matches);
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchesService.update(Number(id));
    res.status(200).json({ message: 'Finished' });
  };

  public updateMatches = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchesService.updateMatches(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(200).json({ });
  };

  public createMatches = async (req: Request, res: Response) => {
    const newMatch = req.body;
    const matches = await this.matchesService.createMatches(newMatch);
    res.status(201).json(matches);
  };
}

export default MatchesController;
