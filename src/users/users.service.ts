import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from './dto/request/create-user-request.dto';
import { UsersRepository } from './users.repository';
import { hash } from 'bcrypt';
import { UserResponse } from './dto/response/user-response.dto';
import { User } from './models/User';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository:UsersRepository){}

    async createUser(createUserRequest:CreateUserRequest):Promise<UserResponse>{
        const user = await this.usersRepository.insertOne({
            ...createUserRequest,
            password: await hash(createUserRequest.password,10),
        });
        return this.buildResponse(user);
    }

    private buildResponse(user:User):UserResponse{
        return{
            _id:(user._id as Types.ObjectId).toHexString(),
            email:user.email,
        };
    }
}
