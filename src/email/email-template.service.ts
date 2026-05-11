import {Injectable} from "@nestjs/common";
import {HelloEmailDto} from "./dto";
import {join} from 'path'
import {readFile} from "node:fs/promises";
import Handlebars from "handlebars";

@Injectable()
export class EmailTemplateService {
    private readonly templates = join(__dirname, "templates");
    public async render(data: HelloEmailDto ): Promise<string> {
        const filePath = join(this.templates, `${data.template}.hbs`);
        const template = await readFile(filePath, "utf8");
        const delegate = Handlebars.compile(template);

        return delegate(data);
    }

}