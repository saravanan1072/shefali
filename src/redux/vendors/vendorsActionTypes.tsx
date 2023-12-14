
export const FETCH_VENDOR_DATA = "FETCH_VENDOR_DATA";

export interface FetchVendorData {
  type: typeof FETCH_VENDOR_DATA;
  payload: any;
}


export type VendorActionTypes =FetchVendorData;
  
