import {IsString, Length} from "class-validator";
import {Trim} from "../../../../../infrastructure/decorators/transform/trim";
import {IsOptionalEmail} from "../../../../../infrastructure/decorators/validate/is-optional-email";


export class UserCreateModel {
    @Trim()
    @IsString()
    @Length(5, 20, {message: "Length not correct"})
    name: string

    @IsOptionalEmail()
    email: string
}



