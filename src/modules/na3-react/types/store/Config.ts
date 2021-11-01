export type ConfigState = {
  environment: "development" | "production" | "test";
};

export type ConfigSetEnvironmentAction = {
  type: "CONFIG_SET_ENVIRONMENT";
  environment: ConfigState["environment"];
};

export type ConfigAction = ConfigSetEnvironmentAction;
