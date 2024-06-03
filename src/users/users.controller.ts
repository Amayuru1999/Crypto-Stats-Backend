import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dto/create-user-request.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}

    @Post()
    async createUser(@Body() CreateUserRequest:CreateUserRequest):Promise<any>{
        return this.usersService.createUser(CreateUserRequest);
    }
}
