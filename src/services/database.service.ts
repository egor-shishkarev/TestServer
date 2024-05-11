import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountDto } from 'src/dto/account.dto';
import { UserEntity } from 'src/entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class DatabaseService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {}

    async add(account: AccountDto) {

        const existingUser = await this.usersRepository.findOne({where: {login: account.login}});
        if (existingUser) {
            return false;
        }

        const newUser = this.usersRepository.create();
        newUser.login = account.login;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(account.password, saltRounds);

        newUser.password = hashedPassword;
        this.usersRepository.save(newUser);
        return true;
    }

    async getAll() {
        return await this.usersRepository.find();
    }

    async getByLogin(login: string): Promise<UserEntity | null> {
        return await this.usersRepository.findOne({ where: {login: login}});
    }

}
