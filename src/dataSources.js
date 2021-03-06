import moment from 'moment';
import coinSymbols from './coinSymbols.json'

function historicalHourEndPoint(symbol, limit) {
    return "https://min-api.cryptocompare.com/data/histominute?fsym=" + symbol + "&tsym=USD&limit=" + limit + "&aggregate=1&e=CCCAGG";
}

function getData(url, format) {
    return fetch(url)
        .then(result => result.json())
        .then(items => {
            var update = {
                pricePoints: [],
                labels: []
            };
            items.Data.forEach(function (pricePt) {
                var pt = { x: pricePt.time, y: pricePt.close };
                update.pricePoints.push(pt);
                var time = moment.unix(pricePt.time).local().format(format);
                update.labels.push(time);
            });
            return update;
        });
}

export function historical1Hour(symbol) {
    return getData(historicalHourEndPoint(symbol, 60), 'hh:mm:ss');
}

export function historical24Hour(symbol) {
    return getData(historicalHourEndPoint(symbol, 1440), 'hh:mm');
}

export function coinLogoUrl(symbol) {
    return coinSymbols[symbol] ? coinSymbols['BaseImageUrl'] + coinSymbols[symbol] : null;
}
