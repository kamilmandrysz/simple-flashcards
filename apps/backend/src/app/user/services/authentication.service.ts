import { HttpStatus, Injectable } from '@nestjs/common';
import { resolveSettledValue } from '@flashcards/utils';
import { UnprocessableEntityException, UnauthorizedException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { JwtService } from '@nestjs/jwt';
import { promisify } from 'util';
import { User } from '../entities';
import { RefreshTokenService } from './refresh-token.service';
import { UserService } from './user.service';
import { addDays, isAfter } from 'date-fns';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private refreshTokenService: RefreshTokenService,
    private i18n: I18nService,
    private jwtService: JwtService
  ) {}

  private async getUsersByEmailAndUsername(
    email: string,
    username: string
  ): Promise<{ userByEmail: User | null; userByUsername: User | null }> {
    //Get and return users by provided email and username
    const [userByEmailSettled, userByUsernameSettled] = await Promise.allSettled([
      this.userService.findByEmail(email),
      this.userService.findByUsername(username),
    ]);

    const userByEmail = resolveSettledValue<User, null>(userByEmailSettled, null);
    const userByUsername = resolveSettledValue<User, null>(userByUsernameSettled, null);

    return { userByEmail, userByUsername };
  }

  private async generateTokens(
    user: User
  ): Promise<{ access_token: string; refresh_token: string }> {
    //Generate JWT access token
    const access_token = await this.jwtService.signAsync(
      {
        sub: user.id,
        user: { id: user.id, username: user.username, email: user.email },
      },
      {
        expiresIn: '1h',
      }
    );

    //Generate JWT refresh token
    const refresh_token = await this.jwtService.signAsync(
      {
        sub: user.id,
      },
      {
        expiresIn: '7d',
      }
    );

    return {
      access_token,
      refresh_token,
    };
  }

  async signUp(email: string, username: string, password: string) {
    //Get users by email or username
    const { userByEmail, userByUsername } = await this.getUsersByEmailAndUsername(email, username);

    //Check if users with provided credentials exists
    //If exists return error
    if (userByEmail || userByUsername) {
      const errors: { email?: string; username?: string } = {};

      if (userByEmail) {
        errors.email = this.i18n.t('validations.messages.uniqueCredential', {
          lang: I18nContext.current().lang,
          args: {
            field: this.i18n.t('validations.fields.email', {
              lang: I18nContext.current().lang,
            }),
          },
        });
      }

      if (userByUsername) {
        errors.username = this.i18n.t('validations.messages.uniqueCredential', {
          lang: I18nContext.current().lang,
          args: {
            field: this.i18n.t('validations.fields.username', {
              lang: I18nContext.current().lang,
            }),
          },
        });
      }

      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors,
      });
    }

    //Hash the users password
    //Generate a salt
    const salt = randomBytes(8).toString('hex');

    //Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //Join the hashed result and the salt together
    const hashedPassword = `${salt}.${hash.toString('hex')}`;

    //Create a new user and save it
    const user = await this.userService.create(email, username, hashedPassword);

    //return the user
    return user;
  }

  async signIn(emailOrUsername: string, password: string) {
    //Get users by email or username
    const { userByEmail, userByUsername } = await this.getUsersByEmailAndUsername(
      emailOrUsername,
      emailOrUsername
    );

    if (!userByEmail && !userByUsername) {
      throw new UnauthorizedException(
        this.i18n.t('validations.messages.wrongCredentials', {
          lang: I18nContext.current().lang,
        })
      );
    }

    const user = userByEmail || userByUsername;

    //Get users salt and hash
    const [salt, hash] = user.password.split('.');

    //Hash provided password
    const providedPassword = (await scrypt(password, salt, 32)) as Buffer;

    //Check for valid credentials
    //If credentials not valid throw error
    if (providedPassword.toString('hex') !== hash) {
      throw new UnauthorizedException(
        this.i18n.t('validations.messages.wrongCredentials', {
          lang: I18nContext.current().lang,
        })
      );
    }

    const { access_token, refresh_token } = await this.generateTokens(user);

    await this.refreshTokenService.create(refresh_token, user);

    //Return token
    return {
      access_token,
      refresh_token,
    };
  }

  async refreshToken(type: string, token: string) {
    //Check if token is in good format
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException(
        this.i18n.t('validations.messages.unauthenticated', {
          lang: I18nContext.current().lang,
        })
      );
    }

    //Get token from database
    const currentRefreshToken = await this.refreshTokenService.findOne(token);

    //Check if token exist and did't expire
    //If expired remove it and throw error
    if (
      !currentRefreshToken ||
      isAfter(new Date(), addDays(new Date(currentRefreshToken.created_at), 7))
    ) {
      throw new UnauthorizedException(
        this.i18n.t('validations.messages.unauthenticated', {
          lang: I18nContext.current().lang,
        })
      );
    }

    //Generate new tokens for user
    const { access_token, refresh_token } = await this.generateTokens(currentRefreshToken.user);

    //Remove used refresh token
    await this.refreshTokenService.remove(currentRefreshToken.id);

    //Add new refresh token to database
    await this.refreshTokenService.create(refresh_token, currentRefreshToken.user);

    //Return tokens
    return {
      access_token,
      refresh_token,
    };
  }
}
