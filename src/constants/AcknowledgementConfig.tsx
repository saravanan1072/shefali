export const resourceAcknowledgementConfig = {
  "Developer Name": "resourceName",
  Experience: "experience",
  "Vendor Costing": "vendorCosting",
  "Contact Number": "contactNumber",
  "Email ID": "emailId",
  Technology: "technology",
  "Vendor Name": "vendor",
  Resume: { name: "resume", showPreview: true },
  Availability: "availability",
  Notes: "notes",
};

export const vendorAcknowledgementConfig = {
  "Company Name": "companyName",
  Location: "location",
  "Account Manager Witarist": "accountManager",
  "Person Contact Details": "contactDetails",
  "Payment Terms": "paymentTerms",
  "Non-Disclosure Agreement": { name: "nda", showPreview: true },
  Notes: "notes",
};

export const clientAcknowledgementConfig = {
  "Client Name": "clientName",
  Location: "location",
  "Account Manager Witarist": "accountManager",
  "Person Contact Details": "contactDetails",
  "Payment Terms":  { name: "paymentTerms", formatRange: true, suffix:"days" },
  "Non-Disclosure Agreement": { name: "nda", showPreview: true },
  Notes: "notes",
};

export const clientRequirementsAcknowledgementConfig = {
  "Client Name": "clientName",
  "Job Description": { name: "jd", showPreview: true },
  "Person Contact Details": "contactPersonDetails",
  "Technology": "technology",
  "Open Positions": "openPositions",
  "Mimimum Budget":"minBudget",
  "Maximum Budget":"maxBudget",
  "Experience":{ name: "experience", formatRange: true, suffix:"years" },
  "Contract Duration": "contractDuration",
  "Work Location":"workLocation"
};
