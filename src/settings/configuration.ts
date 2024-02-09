// https://docs.nestjs.com/techniques/configuration#custom-configuration-files

enum Environments {
  DEVELOPMENT = 'DEVELOPMENT',
  STAGING = 'STAGING',
  PRODUCTION = 'PRODUCTION',
  TEST = 'TEST',
}

export type EnvironmentVariable = { [key: string]: string | undefined };

export type ConfigurationType = ReturnType<typeof getConfig>;
export type ApiSettingsType = ReturnType<typeof getConfig>['apiSettings'];
export type DatabaseSettingsType = ReturnType<
  typeof getConfig
>['databaseSettings'];
export type EnvironmentSettingsType = ReturnType<
  typeof getConfig
>['environmentSettings'];

const getConfig = (
  environmentVariables: EnvironmentVariable,
  currentEnvironment: Environments,
) => {
  return {
    apiSettings: {
      PORT: Number.parseInt(environmentVariables.PORT || '3000'),
      LOCAL_HOST: environmentVariables.LOCAL_HOST || 'http://localhost:3007',
      PUBLIC_FRIEND_FRONT_URL: environmentVariables.PUBLIC_FRIEND_FRONT_URL,
    },

    databaseSettings: {
      MONGO_CONNECTION_URI: environmentVariables.MONGO_CONNECTION_URI,
      MONGO_CONNECTION_URI_FOR_TESTS:
        environmentVariables.MONGO_CONNECTION_URI_FOR_TESTS,
    },

    environmentSettings: {
      currentEnv: currentEnvironment,
      isProduction: currentEnvironment === Environments.PRODUCTION,
      isStaging: currentEnvironment === Environments.STAGING,
      isTesting: currentEnvironment === Environments.TEST,
      isDevelopment: currentEnvironment === Environments.DEVELOPMENT,
      isNonProduction:
        currentEnvironment === Environments.STAGING ||
        currentEnvironment === Environments.TEST ||
        currentEnvironment === Environments.DEVELOPMENT,
      isNonTesting:
        currentEnvironment === Environments.STAGING ||
        currentEnvironment === Environments.PRODUCTION ||
        currentEnvironment === Environments.DEVELOPMENT,
    },
  };
};

export default () => {
  const environmentVariables = process.env;

  console.log('process.env.ENV =', environmentVariables.ENV);
  const currentEnvironment: Environments =
    environmentVariables.ENV as Environments;

  return getConfig(environmentVariables, currentEnvironment);
};
