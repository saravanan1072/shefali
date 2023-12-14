import { Vendor } from "../vendors/vendorState";

export const INITIAL_RESOURCES_STATE: ResourceState = {
    resourceArray: []
  };
  

export interface ResourceState{
    resourceArray:Resource[];
}

export interface Resource{
    resourceName:string,
    experience:number;
    vendor:Vendor,
    vendorCosting:number;
    technology:string[];
    resume:any;
    contactNumber:string;
    emailId:string;
    availability:string,
    managedBy:string;
    notes:string;
}