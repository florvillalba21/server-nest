import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, UseGuards } from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';

@Controller('words')
export class WordsController {

  constructor(private readonly wordsService: WordsService) { }

  @Post()
  @HttpCode(201)
  create(@Body() createWord: CreateWordDto) {
    return this.wordsService.create(createWord);
  }

  @Get()
  findAll() {
    return this.wordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.wordsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateWordDto: UpdateWordDto) {
    return this.wordsService.update(id, updateWordDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.wordsService.remove(id);
  }
}
