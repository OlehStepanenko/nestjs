import {Injectable} from "@nestjs/common";
import {EmailService} from "./email.service";
import {HelloEmailDto, PasswordResetEmailDto} from "./dto";
import {config} from "../common";
import {EmailTemplateService} from "./email-template.service";

@Injectable()
export class HelloEmailService {
    constructor(
        private readonly templateService: EmailTemplateService,
        private readonly emailService: EmailService) {
    }

    public async send(data: PasswordResetEmailDto): Promise<void> {
        const {subject} = config.email.hello

        const input = new HelloEmailDto(data)
        const html = await this.templateService.render(input)

        await this.emailService.send({
            to: data.email,
            subject,
            html,
        })
    }
}
