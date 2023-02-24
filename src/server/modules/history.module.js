import config from '../../config/config';
import httpStatus from 'http-status';
import getConnection from '../../config/server.config'
import moment from 'moment-timezone';
import jwt from 'jsonwebtoken';

const insertHistory = async (token, body) => {

    return new Promise(async (resolve, reject) => {
        jwt.verify(token, config.hash , async (err, payload) => {
            
            if(err){
                return (Object.assign({ code: httpStatus[401] }, { message: err }));
            }

            const {symbol, amount, address, current_price, action_type, gas, gas_price} = body

            const client = getConnection()
            await client.connect()

            let insertQuery = `INSERT INTO crypto_bot.history (symbol, amount, address, current_price, action_type, gas, gas_price, datetime) 
                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
            
            await client.query(insertQuery, [symbol, amount, address, current_price, action_type, gas, gas_price, moment.tz(config.timeZone).format('YYYY-MM-DD HH:mm:ss')])   
            await client.end()

            resolve(Object.assign({ code: httpStatus.OK }, { message: "insert history successful" }));
        })
    })

};

export default {
    insertHistory
};