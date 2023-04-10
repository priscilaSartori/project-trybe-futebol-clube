import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import UserModel from '../models/usersModel';

class UserService {
  private userModel: ModelStatic<UserModel>;
  constructor(userModel: ModelStatic<UserModel>) {
    this.userModel = userModel;
  }

  public async getByEmail(email: string, password: string) {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      return { type: 401, message: 'Invalid email or password' };
    }

    const isPassword = bcrypt.compareSync(password, user.password);
    if (!isPassword) {
      return { type: 401, message: 'Invalid email or password' };
    }
    return { type: null, message: user };
  }
}
export default UserService;
