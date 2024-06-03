import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dto/request/create-user-request.dto';
import { UserResponse } from './dto/response/user-response.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}

    @Post()
    async createUser(@Body() createUserRequest:CreateUserRequest):Promise<UserResponse>{
        return this.usersService.createUser(createUserRequest);
    }
}
