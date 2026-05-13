import {Body, Controller, Post} from "@nestjs/common";
import {AccessDto, LoginDto} from "./dto";
import {AuthService} from "./auth.service";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiUnauthorizedResponse} from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('login')
    @ApiCreatedResponse({type: AccessDto, description: 'Login successfully'})
    @ApiBadRequestResponse({description: 'Authentication failed'})
    @ApiUnauthorizedResponse({description: 'Wrong email or password'})
    login(@Body() data: LoginDto): Promise<AccessDto> {
        return this.authService.login(data);
    }
}