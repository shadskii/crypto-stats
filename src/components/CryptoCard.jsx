import React, { Component } from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import Humanize from 'humanize-plus';
import '../styles/CryptoCard.css';

export class CryptoCard extends Component {

    render() {
        return (
            <Card
                containerStyle={{ paddingBottom: 0 }}
                className="pad-card"
            >
                <CardHeader
                    title={this.props.info.rank + '. ' + this.props.info.name + ' (' + this.props.info.symbol + ')'}
                    subtitle={'Market Cap: $' + Humanize.formatNumber(this.props.info.market_cap_usd, 2)}
                >
                    <h4>{'$' + Humanize.formatNumber(this.props.info.price_usd, 2)}</h4>

                    <table style={{ width: '100%' }}>
                        <tr className='table-header'>
                            <PriceLabel
                                desc={'1hr'}
                                change={this.props.info.percent_change_1h}
                            />
                            <PriceLabel
                                desc={'24hr'}
                                change={this.props.info.percent_change_24h}
                            />
                            <PriceLabel
                                desc={'7d'}
                                change={this.props.info.percent_change_7d}
                            />
                        </tr>
                        <tr className='table-content'>
                            <PriceChange
                                price={this.props.info.price_usd}
                                change={this.props.info.percent_change_1h}
                            />
                            <PriceChange
                                price={this.props.info.price_usd}
                                change={this.props.info.percent_change_24h}
                            />
                            <PriceChange
                                price={this.props.info.price_usd}
                                change={this.props.info.percent_change_7d}
                            />
                        </tr>
                    </table>
                </CardHeader>
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