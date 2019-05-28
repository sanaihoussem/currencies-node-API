const axios = require('axios');

const defines = require('../utils/defines');
const {singleCrypto,cryptoElement} = require('../utils/cryptoModel');
const errorMessage = require('../utils/errorMessage')



const pingToCryptoAPI = async () => {
   return axios.get('https://api.coingecko.com/api/v3/ping')
               .then( () => true)
               .catch( () =>false );
}
 


const fetchAllCrypto = async () => {
    return axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: 'usd',
                        order: 'market_cap_desc',
                        per_page: 250,
                        page: 1,
                        sparkline: false
                    }
                })
                .then( (response) => {
                    if (response.status === defines.SUCCESS_CODE ) {
                        let content = response.data.map(crypto => cryptoElement(crypto)); 
                        return {
                            code: defines.SUCCESS_CODE,
                            content: content
                            }
                        }
                        else { throw new Error('Something went wrong while fetching data .. ')}  
                })
                .catch(error => {
                    return {
                        code: defines.SERVER_INTERNAL_ERROR_CODE,
                        content: errorMessage(error.response.status,error.response ? error.response.data.error : error.errno) 
                    }   
                });
  
}

const fetchSingleCrypto = async (cryptoSymbol) => {
    return axios.get('https://api.coingecko.com/api/v3/coins/'+cryptoSymbol, {
        params: {
            localization: false,
            tickers: false,
            community_data: false,
            developer_data: false,
            sparkline: false
        }
      })
    .then( (response) => {
        if (response.status === defines.SUCCESS_CODE ) { 
            let cryptoInfo = [];
            cryptoInfo.push(singleCrypto(response.data));
            return {
                code: defines.SUCCESS_CODE,
                content: cryptoInfo
            }  
            } else { throw new Error('Something went wrong while fetching data .. ')}
    })
    .catch(error => {
        return {
            code: defines.SERVER_INTERNAL_ERROR_CODE,
            content: errorMessage(error.response.status,error.response ? error.response.data.error : error.errno)  
        }  
    });
  
} 

const getAllCrypto = async () => {
    if (await pingToCryptoAPI()){
        return await fetchAllCrypto();
    }
}

const getSingleCrypto = async (cryptoName) => {
    if (await pingToCryptoAPI()){
        return await fetchSingleCrypto(cryptoName);
    }
}

module.exports =  { getSingleCrypto, getAllCrypto };
