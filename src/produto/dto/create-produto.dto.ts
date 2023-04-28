import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';
export class CreateProdutoDto {
    @JoiSchema(Joi.string().required())
    nome: string;

    @JoiSchema(Joi.string().required())
    file: string;
}