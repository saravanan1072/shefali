import { updateObject } from "../utils";
import {
  ClientActionTypes,
  FETCH_CLIENT_DATA,
  FETCH_CLIENT_REQUIREMENT_DATA,
} from "./clientsActionTypes";
import { ClientState, INITIAL_CLIENT_STATE } from "./clientsState";

const initialState: ClientState = {
  ...INITIAL_CLIENT_STATE,
};

const clientData = (state, action) => {
  return updateObject(state, {
    clientArray: action.payload,
  });
};

const clientRequirementData = (state, action) => {
  return updateObject(state, {
    clientRequirementArray: action.payload,
  });
};

const clientReducer = (state = initialState, action: ClientActionTypes) => {
  switch (action.type) {
    case FETCH_CLIENT_DATA:
      return clientData(state, action);
    case FETCH_CLIENT_REQUIREMENT_DATA:
      return clientRequirementData(state, action);
    default:
      return state;
  }
};

export default clientReducer;
