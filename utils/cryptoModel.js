const singleCrypto = (crypto) => {
    return {
        name: crypto.name,
        symbol: crypto.symbol.toString().toLocaleUpperCase(),
        marketcap: "$"+crypto.market_data.market_cap.usd.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
        price: "$"+crypto.market_data.current_price.usd.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
        change: Number(crypto.market_data.price_change_percentage_24h_in_currency.usd) > 0 ?
                "+" +  Number(crypto.market_data.price_change_percentage_24h_in_currency.usd).toFixed(2).toString().concat("%"):
                Number(crypto.market_data.price_change_percentage_24h_in_currency.usd).toFixed(2).toString().concat("%")
    }
  }

const cryptoElement = (crypto) => {
    return {
        name: crypto.name,
        symbol: crypto.symbol.toString().toLocaleUpperCase(),
        marketcap: "$"+crypto.market_cap.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
        price: "$"+crypto.current_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
        change: Number(crypto.price_change_percentage_24h) > 0 ?
                "+" +  Number(crypto.price_change_percentage_24h).toFixed(2).toString().concat("%"):
                Number(crypto.price_change_percentage_24h).toFixed(2).toString().concat("%")
    }
}

module.exports = {
    singleCrypto , cryptoElement
}