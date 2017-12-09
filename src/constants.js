
export function historicalHourEndPoint(symbol) {
    return "https://min-api.cryptocompare.com/data/histominute?fsym=" + symbol + "&tsym=USD&limit=60&aggregate=1&e=CCCAGG";
}