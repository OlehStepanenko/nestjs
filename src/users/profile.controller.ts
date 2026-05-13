import {Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards} from "@nestjs/common";
import {ProfileService} from "./profile.service";
import {ResetPasswordDto, SetPasswordDTO, ViewProfileDto} from "./dto";
import {AccessGuard, SWAGGER_BEARER_NAME, User} from "src/common";
import type {JWTUser} from "src/auth/models";
import {ApiBearerAuth} from "@nestjs/swagger";

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {
    }
    @Get()
    @UseGuards(AccessGuard)
    @ApiBearerAuth(SWAGGER_BEARER_NAME)
    getProfile(
        @User() user: JWTUser,
    ): Promise<ViewProfileDto> {
        return this.profileService.getSelf(user.userId)
    }

    @Post('reset')
    @HttpCode(HttpStatus.NO_CONTENT)
    resetPassword(@Body() {email}: ResetPasswordDto): Promise<void> {
        return this.profileService.resetPassword(email)
    }

    @Post('password')
    @HttpCode(HttpStatus.NO_CONTENT)
    setPassword(@Body() data: SetPasswordDTO ): Promise<void> {
        return this.profileService.setPassword(data)
    }
}