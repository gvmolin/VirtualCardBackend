import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Repository } from 'typeorm';
import { PaginateQuery, paginate, PaginateConfig } from 'nestjs-paginate';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto) private readonly produto: Repository<Produto>,
  ){}

  create(createProdutoDto: CreateProdutoDto) {
    return this.produto.find()
  }

  async findAll(query: PaginateQuery){
    const paginateConfig: PaginateConfig<Produto> = {
      sortableColumns: ['id',],
      searchableColumns: ["nome"],
    }

    const queryBuilder = this.produto.createQueryBuilder("produto")
    return await paginate<Produto>(query, queryBuilder, paginateConfig)
  }

  findOne(id: number) {
    return `This action returns a #${id} produto`;
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return `This action updates a #${id} produto`;
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }
}
