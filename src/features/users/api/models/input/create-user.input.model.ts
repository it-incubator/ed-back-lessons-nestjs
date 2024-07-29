import { IsEmail, IsString, Length } from "class-validator";
import { Trim } from "src/common/decorators/transform/trim";
import { EmailIsExist } from "../../../../../common/decorators/validate/email-is-exist.decorator";
import { LoginIsExist } from "../../../../../common/decorators/validate/login-is-exist.decorator";

// Доступные декораторы
// https://github.com/typestack/class-validator?tab=readme-ov-file#validation-decorators
export class UserCreateModel {
  @IsString()
  @Trim()
  @Length(3, 10)
  @LoginIsExist()
  login: string;

  @IsString()
  @Trim()
  @Length(6, 20)
  password: string;

  @IsString()
  @Trim()
  @IsEmail()
  @EmailIsExist()
  email: string;
}