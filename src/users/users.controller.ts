import {Body, Controller, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {UsersService} from "./users.service";
import {BanUserDto, CreateUserDto, UserRole, ViewUserDto} from "./dto";
import {IdParamDto, AccessGuard, Roles, User, SWAGGER_BEARER_NAME} from "src/common";
import type {JWTUser} from "src/auth/models";
import {ApiBearerAuth} from "@nestjs/swagger";


@Controller('users')
@Roles(UserRole.Admin)
@UseGuards(AccessGuard)
@ApiBearerAuth(SWAGGER_BEARER_NAME)
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    create(
        @User() {userId}: JWTUser,
        @Body() data: CreateUserDto): Promise<ViewUserDto> {
        return this.usersService.create(data, userId);
    }

    @Get()
    get(): Promise<ViewUserDto[]> {
        return this.usersService.get()
    }

    @Get(':id')
    getOne(@Param() {id}: IdParamDto): Promise<ViewUserDto> {
        return this.usersService.getOne(id)
    }

    @Put(':id')
    update(@Body() data: CreateUserDto, @Param() {id}: IdParamDto): Promise<ViewUserDto> {
        return this.usersService.update(id, data);
    }

    @Post(':id/ban')
    ban(@Param() {id}: IdParamDto, @Body() data: BanUserDto): Promise<ViewUserDto> {
        return this.usersService.ban(id, data);
    }
}