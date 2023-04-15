import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Produto])],
  controllers: [ProdutoController],
  exports:[ProdutoService],
  providers: [ProdutoService]
})
export class ProdutoModule {}
