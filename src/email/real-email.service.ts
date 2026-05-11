import {Injectable} from "@nestjs/common";
import {createTransport, SendMailOptions, Transporter} from "nodemailer";
import {config} from 'src/common';
import {EmailService} from "./email.service";

@Injectable()
export class RealEmailService extends EmailService{
    private  readonly transporter: Transporter;
    constructor() {
        super();
        this.transporter = createTransport(config.email)
    }

    public async send(options: SendMailOptions): Promise<void> {
        await this.transporter.sendMail(options);
    }
}