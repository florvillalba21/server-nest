import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { TasksService } from './tasks.service';
import { LoggerMiddleware } from "./logger/logger.middleware";
import { AuthMiddleware } from "../auth/auth.middleware";
import { PrismaService } from "src/prisma.service";

@Module({
    controllers: [TaskController],
    providers: [TasksService, PrismaService]
})
export class TaskModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {

        //aplicar solo a ciertas rutas 
        // sino solo se coloca el prefijo
        consumer.apply(LoggerMiddleware).forRoutes({
            path: '/tasks', method: RequestMethod.GET
        }).apply(AuthMiddleware).forRoutes('tasks')
    }
} 