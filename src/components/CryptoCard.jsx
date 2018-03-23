import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Humanize from 'humanize-plus';
import HistoricalPriceChart from './HistoricalPriceChart';
import { coinLogoUrl } from '../dataSources';
import '../styles/CryptoCard.css';

export class CryptoCard extends Component {

    render() {
        let coin = this.props.info;
        return (
            <Card
                containerStyle={{ paddingBottom: 0 }}
                className="pad-card"
            >
                <CardHeader
                    title={coin.name + ' (' + coin.symbol + ')'}
                    titleStyle={{ fontSize: '1.3em' }}
                    subtitle={coin.rank + ': Market Cap: $' + Humanize.formatNumber(coin.market_cap_usd, 2)}
                    subtitleStyle={{ fontSize: '.9em' }}
                    avatar={coinLogoUrl(coin.symbol)}
                    showExpandableButton={true}
                >
                    <h4 className="unit-lg"><span className="price-lg">{'$' + Humanize.formatNumber(coin.price_usd, 2)}</span> USD</h4>
                    <h6>{Humanize.formatNumber(coin.price_btc, 8) + ' BTC'}</h6>
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr className='table-header'>
                                <PriceLabel
                                    desc={'1hr'}
                                    change={coin.percent_change_1h}
                                />
                                <PriceLabel
                                    desc={'24hr'}
                                    change={coin.percent_change_24h}
                                />
                                <PriceLabel
                                    desc={'7d'}
                                    change={coin.percent_change_7d}
                                />
                            </tr>
                            <tr className='table-content'>
                                <PriceChange
                                    price={coin.price_usd}
                                    change={coin.percent_change_1h}
                                />
                                <PriceChange
                                    price={coin.price_usd}
                                    change={coin.percent_change_24h}
                                />
                                <PriceChange
                                    price={coin.price_usd}
                                    change={coin.percent_change_7d}
                                />
                            </tr>
                        </tbody>
                    </table>
                </CardHeader>
                <CardText
                    expandable={true}
                >
                    <HistoricalPriceChart symbol={coin.symbol} />
                </CardText>
            </Card >
        );
    }
}

function PriceChange(props) {
    var delta = (Number(props.price) * Number(props.change)) / 100;
    return (
        <td style={{ height: '20px' }}>
            {(delta > 0.0 ? '+' : '-') + '$' + Humanize.formatNumber(Math.abs(delta), 2)}
        </td>
    );
}

function PriceLabel(props) {
    return (
        <td
            style={{ height: '10px' }}>
            <i className={props.change > 0.0 ? "fa fa-caret-up up fa-lg" : "fa fa-caret-down down fa-lg"} aria-hidden="true"></i>
            {' ' + props.desc + ' (' + Humanize.formatNumber(props.change, 2) + '%)'}
        </td>
    );
}
CryptoCard.propTypes = {
    info: PropTypes.object.isRequired
}
export default CryptoCard; 