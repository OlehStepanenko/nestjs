import {Body, Controller, Get, Param, Post, Put} from "@nestjs/common";
import {UsersService} from "./users.service";
import {BanUserDto, CreateUserDto, ViewUserDto} from "./dto";
import {IdParamDto} from "../common";


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    create(@Body() data: CreateUserDto): ViewUserDto {
        return this.usersService.create(data);
    }

    @Get()
    get(): ViewUserDto[] {
        return this.usersService.get()
    }

    @Get(':id')
    getOne(@Param() {id}: IdParamDto): ViewUserDto {
        return this.usersService.getOne(id)
    }

    @Put(':id')
    update(@Body() data: CreateUserDto, @Param() {id}: IdParamDto): ViewUserDto {
        return this.usersService.update(id, data);
    }

    @Post(':id/ban')
    ban(@Param() {id}: IdParamDto, @Body() data: BanUserDto): ViewUserDto {
        return this.usersService.ban(id, data);
    }
}