import {Controller, Post, Param} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly appService: AuthService) {}

    @Post('register')
    getHello(): string {
        return this.appService.getHello();
    }

    @Post('login')
    findOne(@Param('id') id: string) {
        return `This action returns a #${id} cart`;
    }
}
