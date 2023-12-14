import validationMessages from "../../utils/validation/validationMessages";


export const resourceValidations = {
  resourceName: {
    required: {
      value: true,
      message: validationMessages.isEmpty,
    },
    pattern: {
      type: "name",
      message: validationMessages.isText,
    },
  },
  experience: {
    required: {
      value: true,
      message: validationMessages.isEmpty,
    },
    pattern: {
      type: "positiveFloat",
      message: validationMessages.isNumber,
    },
  },
  vendorCosting: {
    pattern: {
      type: "positiveNonzeroFloat",
      message: validationMessages.isNonzeroNumber,
    },
  },
  contactNumber: {
    pattern: {
      type: "mobile",
      message: validationMessages.isMobile,
    },
  },
  emailId: {
    pattern: {
      type: "email",
      message: validationMessages.isEmail,
    },
  },
  technology: {
    required: {
      value: true,
      message: validationMessages.isEmpty,
    },
  },
  vendor: {
    required: {
      value: true,
      message: validationMessages.isEmpty,
    },
  },
  resume: {
    required: {
      value: true,
      message: validationMessages.isEmpty,
    },
  },
  availability: {
    required: {
      value: true,
      message: validationMessages.isEmpty,
    },
  },
};
