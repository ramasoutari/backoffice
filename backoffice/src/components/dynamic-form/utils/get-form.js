import * as Yup from 'yup';
import isEmailValidator from 'validator/lib/isEmail';
import { calculateDateRules } from './calculate-date-rules';
import { checkRule } from './check-rule';
import { validatePhoneNumber } from './validate-phone-number';
import { useLocales } from '../../../locales';
const getFieldTypeValue = (field) => {

  if (field?.type === 'upload' && field?.typeValue === 'array') {
    return field.typeValue;
  }

  switch (field.type) {
    case 'input':
      return field.inputType === 'number' ? 'number' : 'string';

    case 'select':
      return field.multiple ? 'array' : 'string';

    case 'multi-checkbox':
      return 'array';
    // return field.multiple ? "array" : "string";

    case 'repeater':
      return 'array';

    case 'object-editor':
      return 'object';

    case 'checkbox':
      return 'boolean';

    case 'date':
      return 'date';

    default:
      return 'string';
  }
};

const generateValidations = (field) => {
  console.log("Generating validations for field:", field); // Log the current field being processed
  let schema = Yup[field.typeValue || getFieldTypeValue(field)]();
  console.log("Initial schema:", schema); // Log the initial schema

  if (!field.validations) return null;

  for (const rule of field.validations) {
    console.log("Processing validation rule:", rule); // Log each rule being processed
    // ... existing validation logic
  }
  return schema;
};


export const getForm = (formFields) => {
  let defaultValues = {};

  let validationsFields = {};

  for (const field of formFields) {
    if (field.type !== 'form-section') {
      switch (field.type) {
        case 'input':
          if (field.inputType === 'number') {
            defaultValues[field.fieldVariable] = field.value || 0;
          } else {
            defaultValues[field.fieldVariable] = field.value || '';
          }
          break;
        case 'phonefield':
          defaultValues[field.fieldVariable] = field.value || '';
          break;
        case 'date':
          defaultValues[field.fieldVariable] = field.value || undefined;
          break;
        case 'select':
          if (field.multiple) {
            defaultValues[field.fieldVariable] = field.value || [];
          } else {
            defaultValues[field.fieldVariable] = field.value || '';
          }
          break;
        case 'multi-checkbox':
          defaultValues[field.fieldVariable] = field.value || [];
          break;
        case 'repeater':
          defaultValues[field.fieldVariable] = field.value || [];
          break;
        case 'checkbox':
          defaultValues[field.fieldVariable] = field.value || false;
          break;
        case 'object-editor':
          defaultValues[field.fieldVariable] = field.value || {};
          break;
        case 'radio-group':
          defaultValues[field.fieldVariable] = field.value || null;
          break;
        default:
          defaultValues[field.fieldVariable] = field.value || '';
          break;
      }
    }

    if (!field.validations) continue;

    const schema = generateValidations(field);

    validationsFields[field.fieldVariable] = schema;
  }

  const isFieldRequired = (field) => {
    return field.validations?.some(
      (validation) => validation.type === 'required' || validation.type === 'min'
    );
  };

  return {
    validationSchema: Yup.object({
      ...validationsFields,
      captcha: Yup.string().when('generatedCaptcha', {
        is: (value) => !!value,
        // then must equal enteredCaptcha
        then: (schema) =>
          Yup.string()
            .required('required')
            .oneOf([Yup.ref('generatedCaptcha')], 'invalidCaptcha'),
      }),
    }),
    defaultValues: defaultValues,
    fields: formFields.map((field) => ({
      ...field,
      required: isFieldRequired(field),
    })),
  };
};
