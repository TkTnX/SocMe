import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/common/guards";

export const Protected = () => UseGuards(JwtAuthGuard)