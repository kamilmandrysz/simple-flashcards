import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { RefreshToken, User } from '../entities';
import { addDays } from 'date-fns';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken) private repo: Repository<RefreshToken>
  ) {}

  async create(token: string, user: User): Promise<RefreshToken> {
    const refreshToken = await this.repo.create({ token, user });

    return this.repo.save(refreshToken);
  }

  async findById(id: string): Promise<RefreshToken | null> {
    const refreshToken = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });

    return refreshToken || null;
  }

  async findOne(token: string): Promise<RefreshToken | null> {
    const refreshToken = await this.repo.findOne({
      where: { token },
      relations: ['user'],
    });

    return refreshToken || null;
  }

  async remove(id: string): Promise<RefreshToken | null> {
    const refreshToken = await this.findById(id);

    if (!refreshToken) {
      return null;
    }

    return this.repo.remove(refreshToken);
  }

  //Remove expired tokens that were created more than 7 days ago
  @Cron('0 0 0 * * *')
  async handleCron() {
    const expiredTokens = await this.repo.find({
      where: { created_at: LessThan(addDays(new Date(), -7)) },
    });

    const promises = expiredTokens.map((expiredToken) =>
      this.remove(expiredToken.id)
    );

    Promise.all(promises);
  }
}
