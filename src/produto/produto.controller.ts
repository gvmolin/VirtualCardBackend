import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate/lib/decorator';
import { FileInterceptor } from '@nestjs/platform-express';
// import { ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, } from "@nestjs/swagger";
import { multerProductImageOptions } from 'src/core/infrastructure/multer.module';

@Controller('/produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerProductImageOptions))
  create(
    @Body() createProdutoDto: any, 
    @UploadedFile() file: Express.Multer.File
    
  ) {
    const form: CreateProdutoDto = {...createProdutoDto, file:process.env.FILES_PATH + file.filename}
    return this.produtoService.create(form);
  }

  @Get()
  public findAll(@Paginate() query: PaginateQuery) {
    return this.produtoService.findAll(query);
  }

  @ApiOperation({
    operationId: "image",
    summary: "Busca a logo de uma aplicação integrada",
    description: "Busca a logo de uma aplicação integrada através do ID no Banco de Dados do Sistema"
  })
  @ApiOkResponse({
    description: "Imagem do logotipo da aplicação integrada",
    content: {
      "application/image": {
        schema: {
          type: "file",
          format: "binary"
        }
      }
    }
  })
  @Get("/image/:id")
  async getLogo(@Param("id") id: Uuid, @Res() res) {
    const target = await this.produtoService.getTarget(id);
    console.log(target)
    return res.sendFile(target.file);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }
}
