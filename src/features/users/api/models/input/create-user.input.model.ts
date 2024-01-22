import { IsString, Length } from 'class-validator';
import { Trim } from '../../../../../infrastructure/decorators/transform/trim';
import { IsOptionalEmail } from '../../../../../infrastructure/decorators/validate/is-optional-email';
import { NameIsExist } from '../../../../../infrastructure/decorators/validate/name-is-exist.decorator';

// Доступные декораторы
// https://github.com/typestack/class-validator?tab=readme-ov-file#validation-decorators
export class UserCreateModel {
  @Trim()
  @IsString()
  @Length(5, 20, { message: 'Length not correct' })
  @NameIsExist()
  name: string;

  @IsOptionalEmail()
  email: string;
}
