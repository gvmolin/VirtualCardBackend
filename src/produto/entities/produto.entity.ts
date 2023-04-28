import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../core/utils/base.entity";

@Entity()
export class Produto extends BaseEntity{
    @Column({ nullable: false})
    nome: string;

    @Column()
    file:string;

    // @Column()
    // valorCompra:string;

    // @Column()
    // valorVenda:string;

    // @Column()
    // estoque:number;
}