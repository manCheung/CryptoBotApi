import config from '../../config/config';
import APPError from '../helper/AppError';
import httpStatus from 'http-status';
import axios from 'axios';
import getConnection from '../../config/server.config'
import moment from 'moment-timezone';


const getPrice = async (page) => {

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=binance-smart-chain&order=market_cap_desc&per_page=50&page=${page}&sparkline=false`

    try{
        const res = await axios.get(url)
        if(res.status == httpStatus.OK){
            return res.data;
        }
    }
    catch(err){
        console.log('err', err)
        return new APPError.APIError(err);
    }

}

const tokenPrice = async () => {
    const client = getConnection()
    await client.connect()

    let insertQuery = 'INSERT INTO crypto_bot.prices (symbol, symbol_id, price, total_volumn, market_cap, market_cap_rank, high_24h, low_24h, price_change_24h, price_change_percentage_24h, datetime, epoch_time) VALUES '
    let insertLatestQuery = 'INSERT INTO crypto_bot.latest_prices (symbol, symbol_id, price, total_volumn, market_cap, market_cap_rank, high_24h, low_24h, price_change_24h, price_change_percentage_24h, datetime, epoch_time) VALUES '

    let priceResList = []

    for(let i = 1; i <= 20; i++){
        const priceRes = await getPrice(i)
        priceResList = priceResList.concat(priceRes)
    }

    priceResList.forEach(token => {
        insertQuery = insertQuery + `('${token.symbol}', '${token.id}', ${token.current_price}, ${token.total_volume}, 
                                        ${token.market_cap},  ${token.market_cap_rank},  ${token.high_24h},  ${token.low_24h}, ${token.price_change_24h}, ${token.price_change_percentage_24h}, 
                                        '${moment.tz(config.timeZone).format('YYYY-MM-DD HH:mm:ss')}', ${moment.tz(config.timeZone).unix()}),`
        
        insertLatestQuery = insertLatestQuery + `('${token.symbol}', '${token.id}', ${token.current_price}, ${token.total_volume}, 
                                        ${token.market_cap},  ${token.market_cap_rank},  ${token.high_24h},  ${token.low_24h}, ${token.price_change_24h}, ${token.price_change_percentage_24h}, 
                                        '${moment.tz(config.timeZone).format('YYYY-MM-DD HH:mm:ss')}', ${moment.tz(config.timeZone).unix()}),`
    })

    insertQuery = insertQuery.substring(0, insertQuery.length - 1)
    insertLatestQuery = insertLatestQuery.substring(0, insertLatestQuery.length - 1)
    await client.query(insertQuery)
    await client.query(`truncate table crypto_bot.latest_prices`)
    await client.query(insertLatestQuery)

    await client.end()

    return (Object.assign({ code: httpStatus.OK }, { message: "insert successful" }));

};

export default {
    tokenPrice
};