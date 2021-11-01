import { combineReducers } from "redux";

import { authReducer } from "./auth";
import { configReducer } from "./config";
import { departmentsReducer } from "./departments";
import { globalReducer } from "./global";
import { labelTemplatesReducer } from "./labelTemplates";
import { serviceOrdersReducer } from "./serviceOrders";

export const rootReducer = combineReducers({
  auth: authReducer,
  config: configReducer,
  departments: departmentsReducer,
  global: globalReducer,
  labelTemplates: labelTemplatesReducer,
  serviceOrders: serviceOrdersReducer,
});
