import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateWordDto {
    @IsNotEmpty()
    @IsString()
    @Length(5, 5)
    word: string
}
