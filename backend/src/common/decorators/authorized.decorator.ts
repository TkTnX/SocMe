import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { IPayload } from "src/common/types";





export const Authorized = createParamDecorator(
	(data: keyof IPayload, ctx: ExecutionContext) => {
		const req = ctx.switchToHttp().getRequest()

		const user = req.user

		return data ? user[data] : user
	}
)