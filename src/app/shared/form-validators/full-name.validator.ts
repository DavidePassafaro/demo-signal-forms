import { SchemaPath, validate } from '@angular/forms/signals';

const FULL_NAME_REGEX = /^[a-zA-Z]+ [a-zA-Z]+( [a-zA-Z]+)*$/;

/**
 * Validator that checks if a string is a full name (first and last name).
 * A full name is defined as at least two words separated by a space.
 *
 * @param field The schema path of the string field to validate.
 * @param options Optional settings for the validator.
 */
export function fullName(field: SchemaPath<string>, options?: { message?: string }) {
  validate(field, (fieldContext) => {
    const value = fieldContext.value();

    if (!value) {
      // Let required validator handle empty values
      return null;
    }

    const isFullName = FULL_NAME_REGEX.test(value);
    if (!isFullName) {
      return { kind: 'fullNameInvalid', message: options?.message || 'Full name is invalid' };
    }

    return null;
  });
}
