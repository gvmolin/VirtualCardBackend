import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from './produto/produto.module';
import { InfrastructureModule } from './core/infrastructure/infrasctructure.module';

@Module({
  imports: [InfrastructureModule, ProdutoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
