import {Controller, Get, Post, Query,} from '@nestjs/common';
import {AuthService} from "../application/auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Get()
    async me() {
        return await this.authService.method();
    }

    @Post()
    async registration(@Query('name') name: string) {
        return await this.authService.registration(name);
    }
}
