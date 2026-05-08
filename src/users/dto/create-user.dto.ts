import {UserRole} from "./user-role";
import {IsEmail, IsEnum, IsString, Length} from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @Length(1,50)
    firstName: string;

    @Length(1,50)
    lastName: string;

    @IsEnum(UserRole)
    role: UserRole
}