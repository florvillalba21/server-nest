import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
