import historyModule from '../modules/history.module';


const historyPost = async (req, res) => {
    try{
        const datas = req.body;
        const result = await historyModule.insertHistory(req.token, datas)
        res.send(result)
    }catch(err) { 
        return res.send(err);
    };

};

export default {
    historyPost
};