import {IsOptional, IsString} from "class-validator";
import {EnvironmentVariable} from "./configuration";

export class DatabaseSettings {
    constructor(private environmentVariables: EnvironmentVariable) {}
    @IsString()
    MONGODB_URL: string = this.environmentVariables.MONGODB_URL;
    //используется только в тестовом окружении - значение берем из .env
    @IsOptional()
    @IsString()
    DB_TEST_CONNECTION_URI: string = this.environmentVariables.DB_TEST_CONNECTION_URI;
    //используется только в локальном окружении - значение берем из .env
    @IsOptional()
    @IsString()
    DB_DEVELOPMENT_CONNECTION_URI: string =
        this.environmentVariables.DB_DEVELOPMENT_CONNECTION_URI;
}