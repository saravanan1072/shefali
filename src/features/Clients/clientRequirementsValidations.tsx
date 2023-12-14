import validationMessages from "../../utils/validation/validationMessages";

export const clientRequirementsValidations = {
  clientName: {
    required: {
      value: true,
      message: validationMessages.isEmpty,
    },
  },
  minBudget: {
    required: {
      value: true,
      message: validationMessages.isEmpty,
    },
    pattern: {
      type: "positiveNonzeroFloat",
      message: validationMessages.isNonzeroNumber,
    },
  },
  maxBudget: {
    required: {
      value: true,
      message: validationMessages.isEmpty,
    },
    pattern: {
      type: "positiveNonzeroFloat",
      message: validationMessages.isNonzeroNumber,
    },
    customValidation: {
      type:"greaterThan",
      compareWith: "minBudget",
      message: "Maximum Budget should be greater than minimum budget",
    },
  },
  jd: {
    required: {
      value: true,
      message: validationMessages.isEmpty,
    },
  },
  contactPersonDetails: {
    name: {
      required: {
        value: true,
        message: validationMessages.isEmpty,
      },
      customValidation: {
        type:"dependentField",
        dependentOn: "clientName",
        message: "Please enter client name first",
      },
    },
    isPrimary: {
      primary: {
        message: {
          allFalse: "Please set one contact person as primary",
          duplicateTrue: "Only one contact person can be set as primary",
        },
      },
    },
  },
  technology: {
    required: {
      value: true,
      message: validationMessages.isEmpty,
    },
  },
  openPositions: {
    pattern: {
      type: "positiveNonzeroFloat",
      message: validationMessages.isNonzeroNumber,
    },
  },
  workLocation: {
    required: {
      value: true,
      message: validationMessages.isEmpty,
    },
  },
};
