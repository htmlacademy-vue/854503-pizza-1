import { EMAIL_REGEX, TEL_REGEX } from "@/common/const";

const rules = {
  required: {
    rule: (value) => !!value?.trim(),
    message: "Поле обязательно для заполнения",
  },
  email: {
    rule: (value) =>
      value ? EMAIL_REGEX.test(String(value).toLowerCase()) : true,
    message: "Электроная почта имеет неверный формат",
  },
  tel: {
    rule: (value) => (value ? TEL_REGEX.test(value) : true),
    message: "Номер телефона имеет неверный формат",
  },
};

/**
 * @param { String } value
 * @param { String[] } appliedRules
 * @returns { string }
 */

const validator = (value, appliedRules) => {
  let error = "";

  appliedRules.forEach((appliedRule) => {
    if (!rules[appliedRule]) {
      return;
    }

    const { rule, message } = rules[appliedRule];

    if (!rule(value)) {
      error = message;
    }
  });

  return error;
};

export default {
  methods: {
    $validateFields(fields, validations) {
      let isValid = true;

      Object.keys(validations).forEach((key) => {
        validations[key].error = validator(fields[key], validations[key].rules);

        if (validations[key].error) {
          isValid = false;
        }
      });

      return isValid;
    },

    $clearValidationErrors() {
      if (!this.validations) {
        return;
      }
      Object.keys(this.validations).forEach((key) => {
        this.validations[key].error = "";
      });
    },
  },
};
