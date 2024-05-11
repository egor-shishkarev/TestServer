import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountDto } from 'src/dto/account.dto';
import { UserEntity } from 'src/entities';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

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

        const hashedPassword = await argon2.hash(account.password);

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
