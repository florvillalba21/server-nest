import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task-dto";
import { UpdateTaskDto } from "./dto/update-task-dto";
import { ValidateTaskPipe } from "./pipes/validate-task/validate-task.pipe";
import { AuthGuard } from "./guards/auth/auth.guard";

@Controller('/tasks')
@UseGuards(AuthGuard)

export class TaskController {

    constructor(private tasksService: TasksService) { }

    @Get()
    allTasks() {
        return this.tasksService.getTasks()
    }

    @Get('/:id')
    oneTask(@Param('id', ParseIntPipe) id: number) {
        const response = this.tasksService.getTask(id)

        if (!response) {
            throw new HttpException('Tarea no encontrada', 404)
        }


    }


    @Post()

    //pipe perzonalizado 
    createTask(@Body(ValidateTaskPipe) task: CreateTaskDto) {
        return this.tasksService.create(task)
    }

    @Put('/:id')
    updateTask(@Param('id', ParseIntPipe) id: number, @Body() taskUpdate: UpdateTaskDto) {
        return this.tasksService.update(id, taskUpdate)
    }

    @Patch()
    update() {
        return this.tasksService.updateStatus()
    }

    @Delete()
    deleteTask() {
        return this.tasksService.delete()
    }
}