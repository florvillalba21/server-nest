import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateTaskPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    const titleTask = value.title
    const status = typeof (value.status)
    console.log(status)


    if (!titleTask || titleTask.length < 5) {
      throw new HttpException('El titulo debe tener al menos 5 carácteres', HttpStatus.BAD_REQUEST)
    }

    if (!status) {
      throw new HttpException('El estado no es valido', HttpStatus.BAD_REQUEST)
    }

    if (status != 'boolean') {
      throw new HttpException('El estado no es valido', HttpStatus.BAD_REQUEST)
    }

    
    return value;
  }
}
