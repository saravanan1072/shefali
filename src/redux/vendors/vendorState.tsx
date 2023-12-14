export const INITIAL_VENDOR_STATE: VendorState = {
    vendorArray: []
  };
  
  export interface VendorState {
   vendorArray:Vendor[];
  }
  
  export interface Vendor {
    companyName:string;
    location:string;
    contactDetails:Contact[];
    expertise:string[];
    nda:any;
    accountManager:string;
    paymentTerms:string;
    notes:string;
    deployedResources:DeployedResources[];

  }

  export interface Contact{
    email:string;
    name:string;
    phoneNumber:string;
    designation:string;
  }

  export interface DeployedResources{
      resourceName:string;
      experience:number;
      vendor:any;
      vendorcosting:number;
      technology:string[];
      resume:any;
      contactnumber:string;
      emailid:string;
      avaliblity:string;
      managedby:string;
      notes:string;
  }
