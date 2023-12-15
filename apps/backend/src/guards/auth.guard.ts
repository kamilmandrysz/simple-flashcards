import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const i18n = I18nContext.current();

    if (!token) {
      throw new UnauthorizedException(
        i18n.t('validations.messages.unauthenticated', {
          lang: I18nContext.current().lang,
        })
      );
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'adssadsda123123213asdsasda',
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException(
        i18n.t('validations.messages.sessionExpired', {
          lang: I18nContext.current().lang,
        })
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
