import validationMessages from "../../utils/validation/validationMessages";

export const vendorValidations = {
  companyName: {
    required: {
      value: true,
      message: validationMessages.isEmpty,
    }
  },
  location: {
    required: {
      value: true,
      message: validationMessages.isEmpty,
    },
  },
  contactDetails: {
    name: {
      required: {
        value: true,
        message: validationMessages.isEmpty,
      },
      pattern: {
        type: "name",
        message: validationMessages.isText,
      },
    },
    email: {
      required: {
        value: true,
        message: validationMessages.isEmpty,
      },
      pattern: {
        type: "email",
        message: validationMessages.isEmail,
      },
    },
    phoneNumber: {
      pattern: {
        type: "mobile",
        message: validationMessages.isMobile,
      },
    },
    designation: {
      pattern: {
        type: "name",
        message: validationMessages.isText,
      },
    },
    isPrimary:{
      primary:{
        message:{
          allFalse:"Please set one contact person as primary",
          duplicateTrue:"Only one contact person can be set as primary",
        } 
      }
    }
  },
  accountManager: {
    name: {
      required: {
        value: true,
        message: validationMessages.isEmpty,
      }
    },
  },
};
