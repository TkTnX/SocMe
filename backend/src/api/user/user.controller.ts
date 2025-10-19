import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "src/api/user/user.service";

@Controller("users")
export class UserController {
    public constructor(private readonly userService: UserService) { }
    
    @Get(":userId")
    public async getUserById(@Param("userId") userId: string) {
        return await this.userService.findUserById(userId)
    }
}