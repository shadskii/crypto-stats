import React from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import Humanize from 'humanize-plus';
import '../styles/CryptoCard.css';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export function CryptoCard(props) {
    return (
        <Card
            containerStyle={{ paddingBottom: 0 }}
            className="pad-card"
        >
            <CardHeader
                title={props.info.rank + '. ' + props.info.name + ' (' + props.info.symbol + ')'}
                action={<p> {props.info.rank}</p>}
                subtitle={'Market Cap: $' + Humanize.formatNumber(props.info.market_cap_usd, 2)}
            >
                <h4>Price: {'$' + props.info.price_usd}</h4>

                <table style={{ width: '100%' }}>
                    <tr className='table-header'>
                        <PriceLabel
                            desc={'1hr'}
                            change={props.info.percent_change_1h}
                        />
                        <PriceLabel
                            desc={'24hr'}
                            change={props.info.percent_change_24h}
                        />
                        <PriceLabel
                            desc={'7d'}
                            change={props.info.percent_change_7d}
                        />
                    </tr>
                    <tr>
                        <PriceChange
                            price={props.info.price_usd}
                            change={props.info.percent_change_1h}
                        />
                        <PriceChange
                            price={props.info.price_usd}
                            change={props.info.percent_change_24h}
                        />
                        <PriceChange
                            price={props.info.price_usd}
                            change={props.info.percent_change_7d}
                        />
                    </tr>
                </table>


                {/* <Table style={{ width: '100%' }}>
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}
                        style={{ height: '10px' }}
                    >
                        <TableRow
                            style={{ height: '10px' }}
                        >
                            <PriceLabel
                                desc={'1hr'}
                                change={props.info.percent_change_1h}
                            />
                            <PriceLabel
                                desc={'24hr'}
                                change={props.info.percent_change_24h}
                            />
                            <PriceLabel
                                desc={'7d'}
                                change={props.info.percent_change_7d}
                            />
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                    >
                        <TableRow style={{ height: '10px' }}>
                            <PriceChange
                                price={props.info.price_usd}
                                change={props.info.percent_change_1h}
                            />
                            <PriceChange
                                price={props.info.price_usd}
                                change={props.info.percent_change_24h}
                            />
                            <PriceChange
                                price={props.info.price_usd}
                                change={props.info.percent_change_7d}
                            />
                        </TableRow>
                    </TableBody>
                </Table> */}
            </CardHeader>
        </Card>
    );
}

function PriceChange(props) {
    var delta = (Number(props.price) * Number(props.change)) / 100;
    return (
        <td style={{ height: '20px' }}>
            {'$' + Humanize.formatNumber(delta, 2)}
        </td>
    );
}

function PercentChange(props) {
    var delta = (Number(props.price) * Number(props.change)) / 100;
    return (
        <TableRowColumn>
            <i className={delta > 0 ? "fa fa-caret-up up fa-lg" : "fa fa-caret-down down fa-lg"} aria-hidden="true"></i>
            {" " + props.change + '% ($' + Humanize.formatNumber(delta, 2) + ')'}
        </TableRowColumn>
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