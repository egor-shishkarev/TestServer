import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountDto } from 'src/dto/account.dto';
import { UserEntity } from 'src/entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DatabaseService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {}

    async add(account: AccountDto) {
        const newUser = this.usersRepository.create();
        newUser.login = account.login;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(account.password, saltRounds);

        newUser.password = hashedPassword;
    }

    async getAll() {
        return await this.usersRepository.find();
    }

}
