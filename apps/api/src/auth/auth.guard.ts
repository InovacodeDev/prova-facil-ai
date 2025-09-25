import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException();
        }

        const token = authHeader.substring(7);

        // TODO: Validate token with Better Auth
        // const { validateToken } = await import('better-auth');
        // const payload = await validateToken(token, { secret: process.env.BETTER_AUTH_SECRET });
        // if (!payload) throw new UnauthorizedException();
        // request.user = payload;

        // Placeholder
        request.user = { id: "placeholder-user-id" };

        // Sync user
        await this.userService.syncUser(request.user.id);

        return true;
    }
}
