import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserModel, Users } from './schemas/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UserModel }]),
    JwtModule.register({
      global: true,
      secret: 'jwtConstantssadsecret',
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
