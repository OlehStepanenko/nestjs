import {Module} from "@nestjs/common";
import {EmailService} from "./email.service";
import {HelloEmailService} from "./hello-email.service";
import {EmailTemplateService} from "./email-template.service";

@Module({
    providers: [EmailTemplateService, EmailService, HelloEmailService],
    exports: [HelloEmailService],
})
export class EmailModule {

}