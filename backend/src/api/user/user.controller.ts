import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "src/api/user/user.service";
import { Authorized, Protected } from "src/common/decorators";

@Controller("users")
export class UserController {
    public constructor(private readonly userService: UserService) { }
    

    @Protected()
    @Get()
    public async getUsers(@Authorized("userId") userId: string) {
        return await this.userService.findUsers(userId)
    } 

    @Get(":userId")
    public async getUserById(@Param("userId") userId: string) {
        return await this.userService.findUserById(userId)
    }
}