import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { historicalHourEndPoint } from '../constants';


export default class HistoricalPriceChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pricePoints: []
        }
    }
    refresh() {
        var _this = this;
        console.log(this.props.symbol);
        fetch(historicalHourEndPoint(this.props.symbol))
            .then(result => result.json())
            .then(items => {
                var prices = [];
                items.Data.forEach(function (pricePt) {
                    var pt = { x: pricePt.time, y: pricePt.close };
                    prices.push(pt);
                    console.log(pt);
                });

                _this.setState({
                    pricePoints: prices
                });
            })
        console.log('Refreshing prices!')
    }
    componentDidMount() {
        this.refresh();
    }

    render() {
        var data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.pricePoints
                }
            ]
        };

        return (
            <div>
                {/* <h2>Line Example</h2> */}
                <Line data={data} legend={{ display: 'false' }} />
            </div>
        );
    }
}