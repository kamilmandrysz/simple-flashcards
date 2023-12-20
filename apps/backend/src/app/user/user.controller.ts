import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Request,
  Headers,
} from '@nestjs/common';
import { UserService } from './services';
import { AuthenticationService } from './services/authentication.service';
import { CreateUserDto, UserDto, SignInUserDto } from './dto';
import { Serialize } from '../../interceptors';
import { AuthGuard } from '../../guards';

@Controller('auth')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  @Post('/signup')
  @Serialize(UserDto)
  async signUpUser(@Body() body: CreateUserDto) {
    const user = await this.authService.signUp(
      body.email,
      body.username,
      body.password
    );

    return user;
  }

  @Post('/signin')
  async signInUser(@Body() body: SignInUserDto) {
    const tokens = await this.authService.signIn(
      body.emailOrUsername,
      body.password
    );

    return tokens;
  }

  @Get('/refresh')
  async refreshToken(@Headers() headers: Record<string, string>) {
    const [type, token] = headers?.authorization?.split(' ') ?? [];

    return this.authService.refreshToken(type, token);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  @Serialize(UserDto)
  async getProfile(@Req() request: Request) {
    const token: { sub: string } = request['user'];

    const user = await this.userService.findById(token.sub);

    return user;
  }

  @Get('/getAll')
  @Serialize(UserDto)
  async getAllUsers() {
    const users = await this.userService.findAllUsers();

    return users;
  }
}
