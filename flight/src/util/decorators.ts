import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
  } from 'class-validator';
  
  export function IsDateInstance(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isDateInstance',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            return value instanceof Date && !isNaN(value.valueOf());
          },
          defaultMessage(args: ValidationArguments) {
            return `${args.property} must be a valid Date instance`;
          },
        },
      });
    };
  }
  