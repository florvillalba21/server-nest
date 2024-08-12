import { Module } from '@nestjs/common';
import { TaskModule } from './tasks/task.module';
import { PlayersModule } from './players/players.module';
import { WordsModule } from './words/words.module';
import { GamesModule } from './games/games.module';


@Module({
  imports: [TaskModule, PlayersModule, WordsModule, GamesModule],
})
export class AppModule {}
