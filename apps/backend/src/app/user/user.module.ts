import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {
  AuthenticationService,
  RefreshTokenService,
  UserService,
} from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, RefreshToken } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken])],
  controllers: [UserController],
  providers: [UserService, AuthenticationService, RefreshTokenService],
  exports: [UserService],
})
export class UserModule {}
