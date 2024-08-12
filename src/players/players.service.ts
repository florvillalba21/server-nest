import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlayersService {
  constructor(private prisma: PrismaService) { }

  async create(createPlayer: CreatePlayerDto) {

    const existingPlayer = await this.prisma.player.findFirst({
      where: { username: createPlayer.username },
    });

    if (existingPlayer) {
      throw new BadRequestException('Username already exists');
    }


    return this.prisma.player.create({
      data: {
        username: createPlayer.username,
        password: createPlayer.password,
      },
    });

  }

  async findAll() {
    return this.prisma.player.findMany();
  }

  async findOne(id: number) {
    return this.prisma.player.findUnique({
      where: { id },
    });
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return this.prisma.player.update({
      where: { id },
      data: updatePlayerDto,
    });
  }

  async remove(id: number) {
    return this.prisma.player.delete({
      where: { id },
    });
  }

}
