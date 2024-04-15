import {Controller, Post, Query,} from '@nestjs/common';
import {UsersService} from "../application/users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    async create(@Query('name') name: string) {
        return await this.usersService.create(name);
    }
}
