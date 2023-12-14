import { combineReducers } from 'redux';
import { clientReducer } from './clients';
import { commonReducer } from './common';
import { resourceReducer } from './resources';
import {vendorReducer} from './vendors';

export default combineReducers({
    common:commonReducer,
    vendor:vendorReducer,
    resource:resourceReducer,
    client:clientReducer
});