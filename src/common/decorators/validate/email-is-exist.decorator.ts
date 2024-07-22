import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersRepository } from '../../../features/users/infrastructure/users.repository';

// Обязательна регистрация в ioc
@ValidatorConstraint({ name: 'EmailIsExist', async: true })
@Injectable()
export class EmailIsExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly usersRepository: UsersRepository) { }
  async validate(value: any, args: ValidationArguments) {
    const emailIsExist = await this.usersRepository.emailIsExist(value);
    return !emailIsExist;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Email ${validationArguments?.value} already exist`;
  }
}

// https://github.com/typestack/class-validator?tab=readme-ov-file#custom-validation-decorators
export function EmailIsExist(
  property?: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: EmailIsExistConstraint,
    });
  };
}
