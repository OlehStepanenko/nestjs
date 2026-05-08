import {AccessDto, LoginDto} from "./dto";
import {ProfileService} from "../users";
import {randomUUID} from "node:crypto";
import {Injectable} from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor(private readonly profileService: ProfileService){}
    login(data: LoginDto): AccessDto {
        const id = randomUUID()
        const profile = this.profileService.getSelf(id)
        return {...profile, token: 'qwerty'}
    }
}