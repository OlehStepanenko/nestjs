import {Body, Controller, Get, HttpCode, HttpStatus, Post} from "@nestjs/common";
import {ProfileService} from "./profile.service";
import {ResetPasswordDto, SetPasswordDTO, ViewProfileDto} from "./dto";
import {randomUUID} from "node:crypto";

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {
    }
    @Get()
    getProfile(): ViewProfileDto {
        const id = randomUUID();
        return this.profileService.getSelf(id)
    }

    @Post('reset')
    @HttpCode(HttpStatus.NO_CONTENT)
    resetPassword(@Body() data: ResetPasswordDto): void {

    }

    @Post('password')
    @HttpCode(HttpStatus.NO_CONTENT)
    setPassword(@Body() data: SetPasswordDTO ): void {

    }
}