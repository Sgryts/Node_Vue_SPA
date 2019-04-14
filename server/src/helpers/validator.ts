import * as Joi from 'joi';

const validator = () => {

    Joi.objectId = require('joi-objectid')(Joi);
}

export default validator;


