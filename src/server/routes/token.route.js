import express from 'express';
import tokenCtrl from '../controllers/token.controller';
import { validate } from 'express-validation';
import * as Joi from 'joi'
import config from '../../config/config';

const router = express.Router();

console.log(config.project)

const getToken = {
    body: Joi.object({ 
        project: Joi.string().valid(config.project).required().error((errors => { errors.forEach(err => { err.message = "incorrect information"; }); return errors })),
        key: Joi.string().valid(config.key).required().error((errors => { errors.forEach(err => { err.message = "incorrect information"; }); return errors })),
        version: Joi.number().valid(config.version).required().error((errors => { errors.forEach(err => { err.message = "incorrect information"; }); return errors })),
    })
}

router.route('/')
  .post(validate(getToken, {}, {}), tokenCtrl.tokenPost);

export default router;