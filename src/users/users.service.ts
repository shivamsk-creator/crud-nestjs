import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/user.schema';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private model: Model<Users>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.model.create(createUserDto);
    return user;
  }

  async userLogin(loginUserDto: LoginUserDto) {
    console.log('user email', loginUserDto.email);
    console.log('secret key=>', process.env.ACCESS_TOKEN_SECRET);

    const user: any = await this.model.findOne({ email: loginUserDto.email });

    console.log('user  lo', user);

    if (user?.password !== loginUserDto.password) {
      throw new UnauthorizedException();
    }

    return {
      access_token: await this.jwtService.signAsync(user.toJSON()),
      payload: user,
    };
  }

  async findAll() {
    const allTasks = await this.model.find();
    return allTasks;
  }

  async findOne(id: string) {
    const singleUser = await this.model.findOne({ _id: id });
    return singleUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateUser = await this.model.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    return updateUser;
  }

  async remove(id: string) {
    const deletedUser = await this.model.findByIdAndDelete(id);
    return deletedUser;
  }
}
