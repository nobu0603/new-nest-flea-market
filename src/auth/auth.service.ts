import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, status } = createUserDto;
    const user = this.userRepository.create({ username, password, status });

    await this.userRepository.save(user);
    return user;
  }
}
