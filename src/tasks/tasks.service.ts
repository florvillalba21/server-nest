import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
    private tasks = []

    constructor(private prisma: PrismaService) { }


    // getTasks() {
    //     return this.prisma.task.findMany()
    // }

    getTask(id: number) {
        const taskFound = this.tasks.find(task => task.id === id)

        if (!taskFound) {
            return null
        }

        return taskFound;
    }

    create(task: CreateTaskDto) {
        this.tasks.push({
            ...task,
            id: this.tasks.length + 1
        })

        return task
    }

    update(id: number, taskUpdate: UpdateTaskDto) {
        const taskFound = this.tasks.find(task => task.id === id)
        return 'Actualizando la task'
    }

    updateStatus() {
        return 'Actualizando el estado'
    }

    delete() {
        return 'Eliminando'
    }
}
