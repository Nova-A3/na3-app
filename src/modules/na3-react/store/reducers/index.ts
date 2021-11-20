import { combineReducers } from "redux";

import { authReducer } from "./auth";
import { configReducer } from "./config";
import { departmentsReducer } from "./departments";
import { globalReducer } from "./global";
import { labelTemplatesReducer } from "./labelTemplates";
import { maintProjectsReducer } from "./maintProjects";
import { na3PeopleReducer } from "./na3/people";
import { serviceOrdersReducer } from "./serviceOrders";

export const rootReducer = combineReducers({
  auth: authReducer,
  config: configReducer,
  departments: departmentsReducer,
  global: globalReducer,
  labelTemplates: labelTemplatesReducer,
  maintProjects: maintProjectsReducer,
  na3People: na3PeopleReducer,
  serviceOrders: serviceOrdersReducer,
});
