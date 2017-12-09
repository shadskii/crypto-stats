import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { historicalHourEndPoint } from '../constants';
import FlatButton from 'material-ui/FlatButton';

import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

export default class HistoricalPriceChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            graphSelect: 0,
            graphData: {
                pricePoints: [],
                labels: []
            }
        }
    }
    refresh() {
        var _this = this;
        fetch(historicalHourEndPoint(this.props.symbol))
            .then(result => result.json())
            .then(items => {
                var update = {
                    pricePoints: [],
                    labels: []
                };
                items.Data.forEach(function (pricePt) {
                    var pt = { x: pricePt.time, y: pricePt.close };
                    update.pricePoints.push(pt);
                    var time = moment.unix(pricePt.time).format('hh:mm:ss');
                    update.labels.push(time);
                });

                _this.setState({
                    graphData: update
                });
            })
    }
    componentDidMount() {
        this.refresh();
    }

    select = (index) => this.setState({ graphSelect: index });
    render() {
        var data = {
            labels: this.state.graphData.labels,
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
                    data: this.state.graphData.pricePoints,
                    cubicInterpolationMode: 'monotone'
                }
            ]
        };
        console.log('redraw');
        return (
            <div>
                <Line data={data} legend={{ display: false }} />
                <FlatButton label="1 Hour" primary={this.state.graphSelect === 0} onClick={() => this.select(0)} />
                <FlatButton label="24 Hour" primary={this.state.graphSelect === 1} onClick={() => this.select(1)} />
                <FlatButton label="7 Day" primary={this.state.graphSelect === 2} onClick={() => this.select(2)} />
            </div>
        );
    }
}