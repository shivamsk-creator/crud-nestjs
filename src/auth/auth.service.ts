import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/auth.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private model: Model<Users>,
    private jwtService: JwtService,
  ) {}

  async signUp(createAuthDto: CreateAuthDto) {
    const res = await this.model.create(createAuthDto);
    const myres = res.toJSON();

    delete myres.password;
    const token = await this.jwtService.signAsync(myres);

    console.log('created=>', myres);

    if (res) {
      return {
        access_token: token,
        payload: myres,
      };
    }
  }

  async signIn(email: string, password: string) {
    const res = await this.model.findOne(
      {
        email,
        password,
      },
      { password: false },
      { lean: true },
    );

    if (res) {
      return {
        access_token: await this.jwtService.signAsync(res),
        payload: res,
      };
    }

    throw new UnauthorizedException('email or password not found');
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
