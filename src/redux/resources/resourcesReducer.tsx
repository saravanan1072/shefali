import { updateObject } from "../utils";
import { FETCH_RESOURCE_DATA, ResourceActionTypes } from "./resourcesActionTypes";
import { INITIAL_RESOURCES_STATE, ResourceState } from "./resourcesState";
  
  const initialState: ResourceState= {
    ...INITIAL_RESOURCES_STATE,
  };
  
  const resourceData = (state, action) => {
    return updateObject(state, {
      resourceArray: action.payload,
    });
  };
  
  
  const resourceReducer = (state = initialState, action: ResourceActionTypes) => {
    switch (action.type) {
      case FETCH_RESOURCE_DATA:
        return resourceData(state, action);
      default:
        return state;
    }
  };
  
  export default resourceReducer;