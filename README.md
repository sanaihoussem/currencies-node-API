# currencies-node-api
Api nodejs pour l'affichage des devises 

Faire un serveur node (express) sécurisé qui contiendra une route /currencies

Cette route renverra la liste de toutes les crypto-monnaies presentes dans une api (api au choix: Coinmarketcap, Coingecko, Cryptocompare...)

Cette liste devra contenir, pour chaque crypto au moins le nom, symbole, le marketcap, le prix en USD et le % change/24h.

exemple: 
[
    {
        "name": "bitcoin",
        "symbol": "BTC",
        "marketcap": "$71,892,930,673",
        "price": "$4,081.53",
        "change": "+3%"
    },
    {
        "name": "Ethereum",
        "symbol": "ETH",
        "marketcap": "$14,756,973,661",
        "price": "$139.98",
        "change": "+1.2%"
    }
]


La route pourra etre filtrée pour avoir uniquement les infos d'une seule crypto passée en parametre par exemple /currencies/bitcoin retourne:

[
    {
        "name": "bitcoin",
        "symbol": "BTC",
        "marketcap": "$71,892,930,673",
        "price": "$4,081.53",
        "change": "+3%"
    }
]


Le serveur doit renvoyer 404 si la route n'existe pas, 500 si l'api ne repond pas ou 204 si la crypto n'est pas reconnue.
