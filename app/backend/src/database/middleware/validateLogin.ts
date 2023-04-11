import { NextFunction, Request, Response } from 'express';

export default class validateLogin {
  public static validate(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const validationEmail = /\S+@\S+\.\S+/;
    if (!validationEmail.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }
}
