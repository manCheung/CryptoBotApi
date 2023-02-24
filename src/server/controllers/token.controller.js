import tokenModule from '../modules/token.module';


const tokenPost = async (req, res) => {

    try{
        const result = await tokenModule.generateToken()
        res.send(result)
    }catch(err) { 
        return res.send(err);
    };

    // tokenModule.generateToken().then((result) => {
    //   res.send(result);
    // }).catch((err) => { return res.send(err); });
};

export default {
    tokenPost
};