import { Request, Response, NextFunction } from 'express';
import UserService from '../services/usersServices';
import Token from '../utils/jwt.util';

class usersController {
  constructor(private service: UserService) {}

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await this.service.getByEmail(email, password);
      if (!result) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const token = Token.createToken({ email, password, role: result.role });
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  public role = async (req: Request, res: Response) => {
    const role = req.body.data;
    res.status(200).json({ role: role.login.role });
  };
}

export default usersController;
