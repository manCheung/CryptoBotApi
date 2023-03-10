import Joi from 'joi';

require('dotenv').config();

const envVarSchema = Joi.object().keys({
    NODE_ENV: Joi.string().default('development').valid('development', 'production'),
    PORT: Joi.number().default(8080),
    VERSION: Joi.string(),
    SQL_PORT: Joi.number().default(5432),
    SQL_HOST: Joi.string().default('127.0.0.1'),
    SQL_USER: Joi.string(),
    SQL_PASS: Joi.string(),
    SQL_NAME: Joi.string(),
    KEY: Joi.string(),
    HASH: Joi.string(),
    PROJECT: Joi.string(),
    TIME_ZONE: Joi.string(),
}).unknown().required();

const { error, value: envVars } = envVarSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    version: envVars.VERSION,
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    sqlPort: envVars.SQL_PORT,
    sqlHost: envVars.SQL_HOST,
    sqlUserName: envVars.SQL_USER,
    sqlPass: envVars.SQL_PASS,
    key: envVars.KEY,
    hash: envVars.HASH,
    project: envVars.PROJECT,
    timeZone: envVars.TIME_ZONE,
};

export default config;