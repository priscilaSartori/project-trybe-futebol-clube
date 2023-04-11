import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import UserModel from '../models/usersModel';
import { IUser } from '../interfaces/ILogin';

class UserService {
  private userModel: ModelStatic<UserModel>;
  constructor(userModel: ModelStatic<UserModel>) {
    this.userModel = userModel;
  }

  public async getByEmail(email: string, password: string): Promise<IUser | null> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    const isPassword = bcrypt.compareSync(password, user.password);
    if (!isPassword) {
      return null;
    }
    return user;
  }
}
export default UserService;
