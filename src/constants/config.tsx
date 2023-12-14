import { availabilityArray, paymentTermsArray, uploadDateArray } from ".";
import Clients from "../features/Clients/Clients";
import Vendors from "../features/Vendors/Vendors";

export const submitBtnConfig = (btnText:string) => [
  {
    id: 1,
    type: "button",
    size: "medium",
    children:btnText,
    className: "rounded-md text-sm text-white mb-4 mx-auto md:mr-0 md:ml-auto",
  },
];

export const vendorConfiguration = (locationArr, accountManagerArr) => {
  return {
    "Company details": [
      {
        id: 1,
        elementType: "FormInput",
        placeholder: "Company name",
        disablePaste: false,
        name: "companyName",
        disabled: false,
        width: "50%",
      },
      {
        id: 2,
        elementType: "FormAutosuggestDropdown",
        placeholder: "Location",
        suggestionArray: locationArr,
        name: "location",
        disabled: false,
        width: "50%",
      },
    ],
    "Account manager Witarist": [
      {
        id: 10,
        elementType: "RepeatableForm",
        name: "accountManager",
        content: [
          {
            id: 11,
            formIndex: 0,
            elementType: "FormAutosuggestDropdown",
            placeholder: "Enter primary name..",
            secondaryPlaceholder: "Enter secondary name..",
            suggestionArray: accountManagerArr,
            name: "name",
            disabled: false,
            width: "50%",
          },
          {
            id: 12,
            elementType: "FormButton",
            type: "button",
            goal: "ADD",
            placeholder: "+ Add more",
            formIndex: 0,
            className: "mb-4",
          },
          {
            id: 9,
            formIndex: 0,
            elementType: "FormButton",
            type: "button",
            variant: "secondary",
            goal: "REMOVE",
            placeholder: "Remove Item",
            className: "mb-4",
          },
        ],
      },
    ],
    "Person Contact": [
      {
        id: 3,
        elementType: "RepeatableForm",
        name: "contactDetails",
        content: [
          {
            id: 4,
            formIndex: 0,
            elementType: "FormInput",
            placeholder: "Full Name",
            disablePaste: false,
            name: "name",
            disabled: false,
            width: "50%",
          },
          {
            id: 5,
            formIndex: 0,
            elementType: "FormInput",
            placeholder: "Email",
            disablePaste: false,
            name: "email",
            disabled: false,
            width: "50%",
          },
          {
            id: 6,
            formIndex: 0,
            elementType: "FormInput",
            placeholder: "Phone number +91",
            disablePaste: false,
            name: "phoneNumber",
            disabled: false,
            width: "50%",
          },
          {
            id: 7,
            formIndex: 0,
            elementType: "FormInput",
            placeholder: "Designation",
            disablePaste: false,
            name: "designation",
            disabled: false,
            width: "50%",
          },
          {
            id: 4,
            formIndex: 0,
            elementType: "FormToggleSwitch",
            name: "isPrimary",
            label: "Primary contact",
            type: "checkbox",
          },
          {
            id: 8,
            formIndex: 0,
            elementType: "FormButton",
            type: "button",
            goal: "ADD",
            placeholder: "+ Add more",
            className: "mb-4",
          },
          {
            id: 9,
            formIndex: 0,
            elementType: "FormButton",
            type: "button",
            goal: "REMOVE",
            variant: "secondary",
            placeholder: "Remove Item",
            className: "mb-4",
          },
        ],
      },
    ],

    "Payment Terms": [
      {
        id: 13,
        elementType: "FormDropdown",
        disablePaste: true,
        placeholder: "Select",
        options: paymentTermsArray,
        name: "paymentTerms",
        disabled: true,
        width: "50%",
      },
    ],
    "NDA(Non-Disclosure Agreement)": [
      {
        id: 9,
        elementType: "FormUploadInput",
        placeholder: "Upload",
        name: "nda",
        multiple: false,
        accept: ".pdf,.doc,.docx",
      },
    ],
    Notes: [
      {
        id: 14,
        elementType: "FormTextarea",
        width: "100%",
        disablePaste: false,
        placeholder: "Type",
        name: "notes",
        disabled: false,
      },
    ],
  };
};

export const resourceConfiguration = (vendorArray, technologyArray) => {
  return {
    "Resource details": [
      {
        id: 1,
        elementType: "FormInput",
        placeholder: "Name",
        disablePaste: false,
        name: "resourceName",
        disabled: false,
        width: "50%",
      },
      {
        id: 2,
        elementType: "FormInput",
        placeholder: "Experience",
        disablePaste: false,
        name: "experience",
        disabled: false,
        width: "50%",
      },
      {
        id: 3,
        elementType: "FormInput",
        placeholder: "Costing in INR",
        disablePaste: false,
        name: "vendorCosting",
        disabled: false,
        width: "50%",
      },
      {
        id: 4,
        elementType: "FormInput",
        type: "string",
        placeholder: "Phone",
        disablePaste: false,
        name: "contactNumber",
        disabled: false,
        width: "50%",
      },
      {
        id: 5,
        elementType: "FormInput",
        type: "string",
        placeholder: "Email",
        disablePaste: false,
        name: "emailId",
        disabled: false,
        width: "50%",
      },
    ],
    Resume: [
      {
        id: 9,
        elementType: "FormUploadInput",
        placeholder: "Upload",
        name: "resume",
        accept: ".pdf,.doc,.docx",
      },
    ],
    Technology: [
      {
        id: 10,
        elementType: "FormCreatableDropdown",
        name: "technology",
        placeholder: "Select",
        options: technologyArray,
        width: "50%",
      },
    ],
    Availability: [
      {
        id: 10,
        elementType: "FormDropdown",
        disablePaste: false,
        options: availabilityArray,
        name: "availability",
        disabled: true,
        placeholder: "Select",
        width: "50%",
      },
    ],
    "Select Vendor": [
      {
        id: 7,
        elementType: "FormAutosuggestDropdown",
        placeholder: "Name",
        suggestionArray: vendorArray,
        name: "vendor",
        canAddEntry: true,
        popupData: {
          title: "",
          description: (
            <Vendors vendorClassName="mb-14" creatingNewEntry={true} />
          ),
          btnArray: [],
        },
        width: "50%",
      },
    ],
    Notes: [
      {
        id: 12,
        elementType: "FormTextarea",
        disablePaste: false,
        placeholder: "Type",
        name: "notes",
        width: "100%",
        disabled: false,
      },
    ],
  };
};

export const dashboardFilterConfiguration = (technologyArray) => {
  return {
    Technology: [
      {
        id: 1,
        elementType: "FormCreatableDropdown",
        name: "technology",
        placeholder: "Select",
        options: technologyArray,
        width: "100%",
        canCreateNew: false,
      },
    ],
    "Experience(years)": [
      {
        id: 2,
        elementType: "FormRangeSlider",
        name: "experience",
        min: 0,
        max: 25,
        width: "100%",
      },
    ],
    Partner: [
      {
        id: 3,
        elementType: "FormInput",
        placeholder: "Name",
        disablePaste: false,
        name: "vendorName",
        disabled: false,
        width: "100%",
      },
    ],
    Budget: [
      {
        id: 4,
        elementType: "FormInput",
        placeholder: "Min.",
        disablePaste: false,
        name: "minBudget",
        disabled: false,
        width: "100%",
        label: "₹",
      },
      {
        id: 5,
        elementType: "FormInput",
        placeholder: "Max.",
        disablePaste: false,
        name: "maxBudget",
        disabled: false,
        width: "100%",
        label: "₹",
      },
    ],
    "Upload Date": [
      {
        id: 6,
        elementType: "FormRadio",
        name: "sortByDateType",
        options: uploadDateArray,
      },
    ],
    "Team Member": [
      {
        id: 7,
        elementType: "FormInput",
        placeholder: "Name",
        disablePaste: false,
        name: "teamMember",
        disabled: false,
        width: "100%",
      },
    ],
  };
};

export const filterDivSubmitBtnConfig = () => [
  {
    id: 1,
    type: "button",
    size: "medium",
    children: "Apply",
    className: "rounded-md text-sm text-white mx-auto",
  },
  {
    id: 2,
    type: "reset",
    size: "medium",
    children: "Reset",
    className: "rounded-md text-sm text-white mx-auto mt-2",
    variant: "secondary",
  },
];

export const clientConfiguration = (
  locationArr,
  accountManagerArr
) => {
  return {
    "Client Name": [
      {
        id: 1,
        elementType: "FormInput",
        placeholder: "Client Name",
        disablePaste: false,
        name: "clientName",
        disabled: false,
        width: "50%",
      },
      {
        id: 2,
        elementType: "FormAutosuggestDropdown",
        placeholder: "Location",
        suggestionArray: locationArr,
        name: "location",
        disabled: false,
        width: "50%",
      },
    ],
    "Account manager Witarist": [
      {
        id: 3,
        elementType: "RepeatableForm",
        name: "accountManager",
        content: [
          {
            id: 4,
            formIndex: 0,
            elementType: "FormAutosuggestDropdown",
            placeholder: "Enter primary name..",
            secondaryPlaceholder: "Enter secondary name..",
            suggestionArray: accountManagerArr,
            name: "name",
            disabled: false,
            width: "50%",
          },
          {
            id: 5,
            elementType: "FormButton",
            type: "button",
            goal: "ADD",
            placeholder: "+ Add more",
            formIndex: 0,
            className: "mb-4",
          },
          {
            id: 6,
            formIndex: 0,
            elementType: "FormButton",
            type: "button",
            variant: "secondary",
            goal: "REMOVE",
            placeholder: "Remove Item",
            className: "mb-4",
          },
        ],
      },
    ],
    "Person Contact": [
      {
        id: 3,
        elementType: "RepeatableForm",
        name: "contactDetails",
        content: [
          {
            id: 4,
            formIndex: 0,
            elementType: "FormInput",
            placeholder: "Full Name",
            disablePaste: false,
            name: "name",
            disabled: false,
            width: "50%",
          },
          {
            id: 5,
            formIndex: 0,
            elementType: "FormInput",
            placeholder: "Email",
            disablePaste: false,
            name: "email",
            disabled: false,
            width: "50%",
          },
          {
            id: 6,
            formIndex: 0,
            elementType: "FormInput",
            placeholder: "Phone number +91",
            disablePaste: false,
            name: "phoneNumber",
            disabled: false,
            width: "50%",
          },
          {
            id: 7,
            formIndex: 0,
            elementType: "FormInput",
            placeholder: "Designation",
            disablePaste: false,
            name: "designation",
            disabled: false,
            width: "50%",
          },
          {
            id: 4,
            formIndex: 0,
            elementType: "FormToggleSwitch",
            name: "isPrimary",
            label: "Primary contact",
            type: "checkbox",
          },
          {
            id: 8,
            formIndex: 0,
            elementType: "FormButton",
            type: "button",
            goal: "ADD",
            placeholder: "+ Add more",
            className: "mb-4",
          },
          {
            id: 9,
            formIndex: 0,
            elementType: "FormButton",
            type: "button",
            goal: "REMOVE",
            variant: "secondary",
            placeholder: "Remove Item",
            className: "mb-4",
          },
        ],
      },
    ],
    "Payment Terms(in days)": [
      {
        id: 15,
        elementType: "FormRangeSlider",
        name: "paymentTerms",
        min: 1,
        max: 45,
        width: "50%",
      },
    ],
    "NDA(Non-Disclosure Agreement)": [
      {
        id: 16,
        elementType: "FormUploadInput",
        placeholder: "Upload",
        name: "nda",
        multiple: false,
        accept: ".pdf,.doc,.docx",
      },
    ],
    Notes: [
      {
        id: 17,
        elementType: "FormTextarea",
        width: "100%",
        disablePaste: false,
        placeholder: "Type",
        name: "notes",
        disabled: false,
      },
    ],
  };
};

export const clientRequirementsConfiguration = (
  clientArray,
  contactArr,
  technologyArray,
  workLocationArray,
  contractDurationArray
) => {
  return {
    "Client Name": [
      {
        id: 7,
        elementType: "FormAutosuggestDropdown",
        placeholder: "Client Name",
        suggestionArray: clientArray,
        name: "clientName",
        canAddEntry: true,
        popupData: {
          title: "",
          description: (
            <Clients clientClassName="mb-14" creatingNewEntry={true} />
          ),
          btnArray: [],
        },
        width: "50%",
      },
    ],
    Budget: [
      {
        id: 2,
        elementType: "FormInput",
        placeholder: "Min.",
        disablePaste: false,
        name: "minBudget",
        disabled: false,
        width: "50%",
        label: "₹",
      },
      {
        id: 3,
        elementType: "FormInput",
        placeholder: "Max.",
        disablePaste: false,
        name: "maxBudget",
        disabled: false,
        width: "50%",
        label: "₹",
      },
    ],
    "Job Description": [
      {
        id: 4,
        elementType: "FormUploadInput",
        placeholder: "Upload",
        name: "jd",
        multiple: false,
        accept: ".pdf,.doc,.docx",
      },
    ],
    "Person Contact": [
      {
        id: 5,
        elementType: "RepeatableForm",
        name: "contactPersonDetails",
        content: [
          {
            id: 6,
            formIndex: 0,
            elementType: "FormAutosuggestDropdown",
            suggestionArray: contactArr,
            name: "name",
            disabled: false,
            placeholder: "Full Name",
            disablePaste: false,
            width: "50%",
            elementAction:"autofill"
          },
          {
            id: 7,
            formIndex: 0,
            elementType: "FormInput",
            placeholder: "Email",
            disablePaste: false,
            name: "email",
            disabled: true,
            width: "50%",
          },
          {
            id: 8,
            formIndex: 0,
            elementType: "FormInput",
            placeholder: "Phone number +91",
            disablePaste: false,
            name: "phoneNumber",
            disabled: true,
            width: "50%",
          },
          {
            id: 9,
            formIndex: 0,
            elementType: "FormInput",
            placeholder: "Designation",
            disablePaste: false,
            name: "designation",
            disabled: true,
            width: "50%",
          },
          {
            id: 10,
            formIndex: 0,
            elementType: "FormToggleSwitch",
            name: "isPrimary",
            label: "Primary contact",
            type: "checkbox",
          },
          {
            id: 11,
            formIndex: 0,
            elementType: "FormButton",
            type: "button",
            goal: "ADD",
            placeholder: "+ Add more",
            className: "mb-4",
          },
          {
            id: 12,
            formIndex: 0,
            elementType: "FormButton",
            type: "button",
            goal: "REMOVE",
            variant: "secondary",
            placeholder: "Remove Item",
            className: "mb-4",
          },
        ],
      },
    ],
    Technology: [
      {
        id: 13,
        elementType: "FormCreatableDropdown",
        name: "technology",
        placeholder: "Select",
        options: technologyArray,
        width: "50%",
      },
    ],
    "Open Positions": [
      {
        id: 14,
        elementType: "FormInput",
        placeholder: "Open Positions",
        disablePaste: false,
        name: "openPositions",
        disabled: false,
        width: "50%",
      },
    ],
    Experience: [
      {
        id: 15,
        elementType: "FormRangeSlider",
        name: "experience",
        min: 0,
        max: 25,
        width: "50%",
      },
    ],
    "Contract Duration": [
      {
        id: 16,
        elementType: "FormDropdown",
        disablePaste: true,
        placeholder: "Duration",
        options: contractDurationArray,
        name: "contractDuration",
        disabled: true,
        width: "50%",
      },
    ],
    "Work Location": [
      {
        id: 17,
        elementType: "FormDropdown",
        disablePaste: true,
        placeholder: "Location",
        options: workLocationArray,
        name: "workLocation",
        disabled: true,
        width: "50%",
      },
    ],
  };
};
