import * as dotenv from "dotenv"
import { ValidationError } from "@nestjs/common"
import { ValidatorOptions } from "class-validator"
dotenv.config()

export const appConfig = {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost",
    secret: process.env.APP_SECRET
}

export const dbConfig = {
    uri: process.env.DB_URI
}

export const amqpConfig = {
    url: process.env.AMQP_URL || "amqp://localhost"
}

export const googleConfig = {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL!,
}


export interface ValidationPipeOptions extends ValidatorOptions {
    transform?: boolean;
    disableErrorMessages?: boolean;
    exceptionFactory?: (errors: ValidationError[]) => any;
  }