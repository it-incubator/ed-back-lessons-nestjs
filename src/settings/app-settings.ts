import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';

config();

export type EnvironmentVariable = { [key: string]: string | undefined };
export type EnvironmentsTypes =
  | 'DEVELOPMENT'
  | 'STAGING'
  | 'PRODUCTION'
  | 'TESTING';
export const Environments = ['DEVELOPMENT', 'STAGING', 'PRODUCTION', 'TESTING'];

//TODO: should be injectable
//@Injectable()
export class EnvironmentSettings {
  constructor(private env: EnvironmentsTypes) {}

  getEnv() {
    return this.env;
  }

  isProduction() {
    return this.env === 'PRODUCTION';
  }

  isStaging() {
    return this.env === 'STAGING';
  }

  isDevelopment() {
    return this.env === 'DEVELOPMENT';
  }

  isTesting() {
    return this.env === 'TESTING';
  }
}

//TODO: should be injectable
//@Injectable()
class AppSettings {
  constructor(
    public env: EnvironmentSettings,
    public api: APISettings,
  ) {}
}

//TODO: should be injectable
//@Injectable()
class APISettings {
  // Application
  public readonly APP_PORT: number;

  // Database
  public readonly MONGO_CONNECTION_URI: string;
  public readonly MONGO_CONNECTION_URI_FOR_TESTS: string;

  constructor(readonly envVariables: EnvironmentVariable) {
    // Application
    this.APP_PORT = this.getNumberOrDefault(envVariables.APP_PORT, 7840);

    // Database
    this.MONGO_CONNECTION_URI =
      envVariables.MONGO_CONNECTION_URI ?? 'mongodb://localhost/nest';
    this.MONGO_CONNECTION_URI_FOR_TESTS =
      envVariables.MONGO_CONNECTION_URI_FOR_TESTS ?? 'mongodb://localhost/test';
  }

  private getNumberOrDefault(value: string, defaultValue: number): number {
    const parsedValue = Number(value);

    if (isNaN(parsedValue)) {
      return defaultValue;
    }

    return parsedValue;
  }
}

//TODO: should be instantiated from DI
const env = new EnvironmentSettings(
  (Environments.includes(process.env.ENV?.trim())
    ? process.env.ENV.trim()
    : 'DEVELOPMENT') as EnvironmentsTypes,
);

//TODO: should be instantiated from DI
const api = new APISettings(process.env);
//TODO: should be instantiated from DI
export const appSettings = new AppSettings(env, api);
