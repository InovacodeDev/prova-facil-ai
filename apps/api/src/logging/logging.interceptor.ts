import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { LoggingService } from "./logging.service";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly loggingService: LoggingService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const startTime = Date.now();

        // Extract request data
        const userId = request.user?.id;
        const ip = request.ip || request.connection?.remoteAddress || request.socket?.remoteAddress;
        const method = request.method;
        const url = request.url;

        // Log request start
        this.loggingService.logRequest("info", `Request started: ${method} ${url}`, {
            userId,
            ip,
            method,
            url,
        });

        return next.handle().pipe(
            tap(() => {
                const responseTimeMs = Date.now() - startTime;
                const statusCode = response.statusCode;

                // Log successful request completion
                this.loggingService.logRequest("info", `Request completed: ${method} ${url}`, {
                    userId,
                    ip,
                    method,
                    url,
                    statusCode,
                    responseTimeMs,
                });
            }),
            catchError((error) => {
                const responseTimeMs = Date.now() - startTime;
                const statusCode = error.status || 500;

                // Log failed request completion
                this.loggingService.logRequest("error", `Request failed: ${method} ${url} - ${error.message}`, {
                    userId,
                    ip,
                    method,
                    url,
                    statusCode,
                    responseTimeMs,
                });

                throw error;
            })
        );
    }
}
