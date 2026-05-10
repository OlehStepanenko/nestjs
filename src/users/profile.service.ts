import {SetPasswordDTO, UserRole, ViewProfileDto} from "./dto";
import {ForbiddenException, Injectable} from "@nestjs/common";
import {PasswordResetService} from "./password-reset.service";
import {PrismaService} from "../prisma";
import {UserStatus} from "../../generated/prisma/enums";

@Injectable()
export class ProfileService {
    constructor(
        private readonly passwordResetService: PasswordResetService,
        private readonly prisma: PrismaService
    ) {
    }
    public getSelf(id: string): ViewProfileDto {
        return {
            id,
            role: UserRole.User,
            firstName: 'Vasya1',
            lastName: 'Vasylyiv1',
            email: 'vasya@example.com',
        }
    }

    public async resetPassword(email: string): Promise<void> {
        const user = await this.prisma.user.findFirst({
            where: { email: {equals: email, mode: 'insensitive'} }
        })

        if (!user) return;

        if (user.status !== UserStatus.active) {
            throw new ForbiddenException('Account is banned')
        }

        await this.passwordResetService.createOrReplace(user.id, user.email)
    }

    public async setPassword({email, password, code}: SetPasswordDTO): Promise<void> {
        const user = await this.prisma.user.findFirst({
            where: { email: {equals: email, mode: 'insensitive'} }
        })

        if (!user) return;

        if (user.status !== UserStatus.active) {
            throw new ForbiddenException('Account is banned')
        }

        await this.passwordResetService.setPassword(user.id, code, password)

    }
}