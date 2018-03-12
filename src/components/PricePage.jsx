import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import CryptoCard from './CryptoCard';

const API = "https://api.coinmarketcap.com/v1/ticker/?limit=";
class PricePage extends Component {
    static defaultProps = {
        feedSize: 50
    }

    constructor(props) {
        super(props);
        this.state = {
            coinStats: [],
            fetchingData: true
        };
    }
    refresh() {
        this.setState({ fetchingData: true })
        var _this = this;
        fetch(API + this.props.feedSize)
            .then(result => result.json())
            .then(items => {
                _this.setState({
                    coinStats: items,
                    fetchingData: false
                });
            })
        console.log('Refreshing prices!')
    }

    fetchMore() {
        var _this = this;
        fetch(API + this.props.feedSize + '&start=' + this.state.coinStats.length)
            .then(result => result.json())
            .then(items => {
                var updated = this.state.coinStats.concat(items);
                _this.setState({
                    coinStats: updated
                });
            });
        console.log('Adding more prices');
    }

    componentDidMount() {
        this.refresh(this.props.feedSize);
    }

    render() {
        return (
            <div className='container-fluid content-scroll'>
                <div className='row'>
                    {this.state.fetchingData ?
                        (<div className='center-content'>
                            <CircularProgress size={80} thickness={7} />
                        </div>)
                        :
                        (this.state.coinStats.map(function (el, index) {
                            return <div key={index} className='col-md-6'>
                                <CryptoCard info={el} />
                            </div>
                        }))
                    }
                    <FlatButton className='col-md-12' onClick={() => this.fetchMore()} label="Load More" />
                </div>
            </div>
        );
    }
}
PricePage.propTypes = {
    feedSize: PropTypes.number
}
export default PricePage;