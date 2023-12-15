import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthenticationService, RefreshTokenService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, RefreshToken } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken])],
  controllers: [UserController],
  providers: [UserService, AuthenticationService, RefreshTokenService],
})
export class UserModule {}
