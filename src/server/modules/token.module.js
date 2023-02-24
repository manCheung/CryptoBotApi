import config from '../../config/config';
import jwt from 'jsonwebtoken';
import APPError from '../helper/AppError';
import httpStatus from 'http-status';

const generateToken = () => {
    const payload = {
        companyName: "crypto_bot"
    };
     const token = jwt.sign({ payload, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) }, config.hash); // 1 day token
    if(token){
        return (Object.assign({ code: httpStatus.OK }, { message: '', token }));
    }else{
        return(new APPError.GetTokenError());
    }
};

export default {
    generateToken
};