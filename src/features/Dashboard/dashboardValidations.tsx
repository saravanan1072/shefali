import validationMessages from "../../utils/validation/validationMessages";


export const dashboardValidations = {
  minBudget: {
    pattern: {
      type: "number",
      message: validationMessages.isNumber,
    },
  },
  maxBudget:{
    pattern: {
        type: "number",
        message: validationMessages.isNumber,
      },
  },
  teamMember: {
    pattern: {
      type: "name",
      message: validationMessages.isText,
    },
  }
};
