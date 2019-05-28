const express = require('express');
const helmet = require('helmet');

const errorMessage = require('../utils/errorMessage');
const defines = require('../utils/defines');
const {getSingleCrypto,getAllCrypto} = require('../coingecko/coingecko');


const port = process.env.port || defines.DEV_EXPRESS_PORT ;

const app = express();
// SECURITY: appropriately configuring HTTP headers.
app.use(helmet());


// crypto check regex
function createRegExpParameter(re){
    return (req, res, next, val) => {
        re.exec(String(val)) ? 
            next() :
            res.status(defines.BAD_REQUEST_ERROR_CODE).send(errorMessage(defines.BAD_REQUEST_ERROR_CODE,defines.BAD_REQUEST_ERROR_MESSAGE));
    }
  }



// middleware to decode URI and throw error if it contains undesired characters
app.use( (req, res, next) => {

    var err = null;
    try { decodeURIComponent(req.path);  }
    catch(e) {
        err = e;
    }
    err ? res.status(defines.BAD_REQUEST_ERROR_CODE).send(errorMessage(defines.BAD_REQUEST_ERROR_CODE,defines.BAD_REQUEST_ERROR_MESSAGE)) :
            next();
    
});

// verify crypto param against regex and acce only caracters and numbers
app.param('crypto', createRegExpParameter(/^[a-zA-Z0-9]*$/));
app.get('/currencies/:crypto?', async(req, res) => {
    
    let data = req.params.crypto ?
         await getSingleCrypto(req.params.crypto.toString().toLocaleLowerCase()) :
         await getAllCrypto();
    if (data.content.message && data.content.message === "Could not find coin with the given id" ){
        res.status(defines.CRYPTO_NOT_RECOGNIZED_ERROR_CODE).send(defines.CRYPTO_NOT_RECOGNIZED_ERROR_MESSAGE);
    }else{
        res.status(data.code);
        res.send(data.content);
    }
    

 });

app.get('*', function(req, res) {
    res.status(defines.NOT_FOUND_ERROR_CODE);
    res.send(errorMessage(defines.NOT_FOUND_ERROR_CODE,defines.NOT_FOUND_ERROR_MESSAGE));
  });



app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports = app;
