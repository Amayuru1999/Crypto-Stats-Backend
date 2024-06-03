import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user-request.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository:UsersRepository){}

    async createUser(createUserRequest:CreateUserRequest):Promise<any>{
        return this.usersRepository.insertOne(createUserRequest)
    }
}
