import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Humanize from 'humanize-plus';
import '../styles/CryptoCard.css';

export function CryptoCard(props) {
    var time = new Date(props.info.last_updated);
    // console.log(props.info.last_updated);
    return (
        <Card>
            <CardHeader
                title={props.info.rank + '. ' + props.info.name + ' (' + props.info.symbol + ')'}
                action={<p> {props.info.rank}</p>}
                subtitle={'Market Cap: $' + Humanize.formatNumber(props.info.market_cap_usd, 2)}
            >
                <h5>Price: {'$' + props.info.price_usd}</h5>
                <ul>
                    <PercentChange
                        desc={'1 hour'}
                        price={props.info.price_usd}
                        change={props.info.percent_change_1h}
                    />
                    <PercentChange
                        desc={'24 hours'}
                        price={props.info.price_usd}
                        change={props.info.percent_change_24h}
                    />
                    <PercentChange
                        desc={'7 days'}
                        price={props.info.price_usd}
                        change={props.info.percent_change_7d}
                    />
                </ul>
            </CardHeader>
        </Card>
    );
}

function PercentChange(props) {
    var delta = (Number(props.price) * Number(props.change)) / 100;
    return (
        <li>
            {props.desc + " "}
            <i className={delta > 0 ? "fa fa-caret-up up fa-lg" : "fa fa-caret-down down fa-lg"} aria-hidden="true"></i>
            {" " + props.change + '% ' + '($' + Humanize.formatNumber(delta, 2) + ')'}
        </li>
    )
}