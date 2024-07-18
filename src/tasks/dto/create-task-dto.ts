import { IsBoolean, IsNotEmpty, IsString, Length } from "class-validator"


export class CreateTaskDto {
    @IsString()
    @Length(10, 15) 
    title: string

    @IsBoolean()
    @IsNotEmpty()
    status: boolean
}