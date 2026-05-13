import {AsyncJwt} from "./async-jwt";
import {UserRole} from "src/users/dto";

const ONE_SECOND = 1_000
export type JWTUser = {
    userId: string,
    userRole: UserRole
}
export class UserJwt {
    private readonly jwt: AsyncJwt;

    constructor(secret: string, private readonly expirationSeconds: number) {
        this.jwt = new AsyncJwt(secret);
    }

    public async sign(userId: string, userRole: UserRole): Promise<string> {
        const now = Math.floor(Date.now() / ONE_SECOND);
        const expiration = now + this.expirationSeconds

        return this.jwt.sign({
            sud: userId,
            iat: now,
            exp: expiration,
            role: userRole,
        })
    }

    public async verify(token: string): Promise<JWTUser> {
        const data = await this.jwt.verify(token)

        return {
            userId: data.sud,
            userRole: data.role,
        }
    }
}