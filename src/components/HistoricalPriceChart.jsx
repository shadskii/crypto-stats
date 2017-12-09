import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import FlatButton from 'material-ui/FlatButton';
import { historical24Hour } from '../dataSources';

export default class HistoricalPriceChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            graphSelect: 0,
            data: [
                {
                    pricePoints: [],
                    labels: []
                },
                {
                    pricePoints: [],
                    labels: []
                }
            ],
        }
    }
    refresh() {
        var _this = this;
        historical24Hour(this.props.symbol).then(update => {
            _this.setState({
                data: [
                    {
                        pricePoints: update.pricePoints.slice(0, 60),
                        labels: update.labels.slice(0, 60)
                    },
                    update
                ]
            });
        });
    }
    componentDidMount() {
        this.refresh();
    }

    select = (index) => this.setState({ graphSelect: index });

    render() {
        var data = {
            labels: this.state.data[this.state.graphSelect].labels,
            datasets: [
                {
                    label: this.props.symbol,
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
                    data: this.state.data[this.state.graphSelect].pricePoints,
                    cubicInterpolationMode: 'monotone'
                }
            ]
        };
        console.log('redraw');
        return (
            <div>
                <h5>{this.state.graphSelect === 0 ? '1 Hour Graph' : '24 Hour Graph'}</h5>
                <Line data={data} legend={{ display: false }} redraw />
                <FlatButton label="1 Hour" primary={this.state.graphSelect === 0} onClick={() => this.select(0)} />
                <FlatButton label="24 Hour" primary={this.state.graphSelect === 1} onClick={() => this.select(1)} />
            </div>
        );
    }
}