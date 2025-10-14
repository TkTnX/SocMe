import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

export function getJwtConfig(config: ConfigService): JwtModuleOptions {
    return {
        secret: config.getOrThrow("JWT_SECRET"),
        signOptions: {
            algorithm: "HS256"
        },
        verifyOptions: {
            algorithms: ['HS256'],
            ignoreExpiration: false,
        }
    }
}