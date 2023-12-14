import { updateObject } from "../utils";
import { FETCH_VENDOR_DATA, VendorActionTypes } from "./vendorsActionTypes";
import { INITIAL_VENDOR_STATE, VendorState } from "./vendorState";
  
  const initialState: VendorState = {
    ...INITIAL_VENDOR_STATE,
  };
  
  const vendorData = (state, action) => {
    return updateObject(state, {
      vendorArray: action.payload,
    });
  };
  
  
  const vendorReducer = (state = initialState, action: VendorActionTypes) => {
    switch (action.type) {
      case FETCH_VENDOR_DATA:
        return vendorData(state, action);
      default:
        return state;
    }
  };
  
  export default vendorReducer;