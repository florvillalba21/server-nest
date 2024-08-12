import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WordsService {
  constructor(private prisma: PrismaService) { }


  async create(createWord: CreateWordDto) {
    try {
      const existingWord = await this.prisma.word.findFirst({
        where: { word: createWord.word },
      });

      //validar que no exista una palabra igual
      if (existingWord) {
        throw new BadRequestException('Word already exists.')
      }

      return this.prisma.word.create({
        data: {
          word: createWord.word
        }
      })

    } catch (error) {
      throw new HttpException('Internal server error', 500)
    }

  }

  async findAll() {
    try {
      return await this.prisma.word.findMany()
    } catch (error) {
      throw new HttpException('Internal server error', 500)
    }

  }

  async findOne(id: number) {
    try {
      return await this.prisma.word.findUnique({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException('Word does not exist.');
      }
      throw new HttpException('Internal server error', 500);
    }

  }


  async update(id: number, updateWordDto: UpdateWordDto) {
    try {
      return await this.prisma.word.update({
        where: { id },
        data: updateWordDto,
      });

    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException('Word does not exist.');
      }
      throw new HttpException('Internal server error', 500);
    }
  }


  async remove(id: number) {
    try {
      return await this.prisma.word.delete({ where: { id } })

    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException('Word does not exist.');
      }
      throw new HttpException('Internal server error', 500);
    }


  }
}
