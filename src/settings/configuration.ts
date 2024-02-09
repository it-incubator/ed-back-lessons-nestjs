// https://docs.nestjs.com/techniques/configuration#custom-configuration-files
export default () => ({
  env: process.env.ENV || 'DEVELOPMENT',
  port: parseInt(process.env.PORT, 10) || 3000,
  databaseUris: {
    prod: process.env.MONGO_CONNECTION_URI,
    test: process.env.MONGO_CONNECTION_URI_FOR_TESTS,
  },
});
