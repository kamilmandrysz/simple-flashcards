import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.repo.findOne({ where: { id } });

    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repo
      .createQueryBuilder()
      .where('LOWER(email) = LOWER(:email)', { email })
      .getOne();

    return user || null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.repo
      .createQueryBuilder()
      .where('LOWER(username) = LOWER(:username)', { username })
      .getOne();

    return user || null;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.repo.find();

    return users;
  }

  async create(email: string, username: string, password: string) {
    const user = await this.repo.create({ email: email.toLowerCase(), username, password });

    return this.repo.save(user);
  }
}
