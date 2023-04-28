import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate/lib/decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { multerImageOptions } from 'src/core/infrastructure/multer.module';

@Controller('/produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerImageOptions))
  create(
    @Body() createProdutoDto: any, 
    @UploadedFile() file: Express.Multer.File
    
  ) {
    console.log(file)
    console.log(createProdutoDto)
    const form: CreateProdutoDto = {...createProdutoDto, file:process.env.FILES_PATH + file.filename}
    console.log(form)
    return this.produtoService.create(form);
  }

  @Get()
  public findAll(@Paginate() query: PaginateQuery) {
    console.log("aaa")
    console.log(query)
    
    const res = this.produtoService.findAll(query);
    console.log(res)
    return res
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
