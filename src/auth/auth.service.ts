import {AccessDto, LoginDataDto, LoginDto} from "./dto";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PrismaService} from "src/prisma";
import {mapUserRoleFromDB, mapUserStatusFromDB} from "../users/mappers";
import {UserStatus} from "src/users/dto";
import {config, Hasher} from "src/common";
import {UserJwt} from "./models";
import {ProfileService} from "../users";

const ERROR_MESSAGE = 'Wrong email or password'

@Injectable()
export class AuthService {
    private readonly jwt = new UserJwt(config.jwt.secret, config.jwt.expirationSeconds)
    constructor(
        private readonly prisma: PrismaService,
        private readonly profile: ProfileService){}

    public async login(data: LoginDto): Promise<AccessDto> {
        const user = await this.retrieveForLogin(data.email);
        this.checkLoginPermission(user);

        const match = Hasher.verify(user.hash, data.password)
        if (!match) throw new UnauthorizedException(ERROR_MESSAGE);

        const token = await this.jwt.sign(user.id, user.role)
        const profile = await this.profile.getSelf(user.id)

        return {
            ...profile,
            token
        };
    }

    private async retrieveForLogin(email: string): Promise<LoginDataDto> {
        const data = await this.prisma.user.findFirst({
            where: {email: {equals: email, mode: 'insensitive'}},
            select: {
                id: true,
                hash: true,
                role: true,
                status: true,
            }
        })

        if (!data || !data.hash) {
            throw new UnauthorizedException(ERROR_MESSAGE);
        }

        return {
            id: data.id,
            hash: data.hash,
            role: mapUserRoleFromDB(data.role),
            status: mapUserStatusFromDB(data.status),
        }
    }

    private checkLoginPermission(user: LoginDataDto): void {
        if (user.status !== UserStatus.Active) {
            throw new UnauthorizedException(ERROR_MESSAGE);
        }
    }
}