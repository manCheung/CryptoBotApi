import priceModule from '../modules/price.module';
import priceDeleteModule from '../modules/price.delete.module';


const PriceGet = async (req, res) => {
    try{
        const result = await priceModule.tokenPrice()
        res.send(result)
    }catch(err) { 
        return res.send(err);
    };

};

const PriceDelete = async (req, res) => {
    try{
        const result = await priceDeleteModule.deletePrice()
        res.send(result)
    }catch(err) { 
        return res.send(err);
    };

};

export default {
    PriceGet,
    PriceDelete
};