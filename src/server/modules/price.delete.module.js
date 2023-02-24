import config from '../../config/config';
import APPError from '../helper/AppError';
import httpStatus from 'http-status';
import axios from 'axios';
import getConnection from '../../config/server.config'
import moment from 'moment-timezone';


const deletePrice = async () => {
    
    let period = moment.tz(config.timeZone).subtract(7, 'day').unix();
    const client = getConnection()
    await client.connect()
    await client.query('DELETE FROM crypto_bot.prices WHERE epoch_time < $1', [period])
    await client.end()
    return (Object.assign({ code: httpStatus.OK }, { message: "delete successful" }));
    
};

export default {
    deletePrice
};

