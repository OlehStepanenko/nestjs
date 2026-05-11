import {Injectable} from "@nestjs/common";
import {createTransport, SendMailOptions, Transporter} from "nodemailer";
import {config} from 'src/common';

@Injectable()
export class EmailService {
    private  readonly transporter: Transporter;
    constructor() {
        this.transporter = createTransport(config.email)
    }

    public async send(options: SendMailOptions): Promise<void> {
        await this.transporter.sendMail(options);
    }
}