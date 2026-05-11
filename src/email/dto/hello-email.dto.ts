import {PasswordResetEmailDto} from "./password-reset.email.dto";
import {config} from "src/common";

export class HelloEmailDto {
    public readonly template = 'hello';

    public readonly name: string;

    public readonly link: string;

    public readonly expiration: string

    constructor(data: PasswordResetEmailDto) {
        const {baseUrl, confirmURL} = config.frontend
        this.name = data.name;
        this.link = `${baseUrl}${confirmURL}?email=${data.email}&code=${data.code}`;
        this.expiration = data.expiresAt.toLocaleDateString('en-US');
    }
}