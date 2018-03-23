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
            fetchingData: true,
            numCoins: 0
        };
    }

    fetch() {
        this.setState({ fetchingData: true })
        var _this = this;
        fetch(API + this.props.feedSize + '&start=' + this.state.numCoins)
            .then(result => result.json())
            .then(items => {
                var updated = this.state.coinStats.concat(items);
                _this.setState({
                    coinStats: updated,
                    numCoins: updated.length,
                    fetchingData: false
                });
            });
    }

    componentDidMount() {
        this.fetch();
    }

    render() {
        return (
            <div className='container-fluid content-scroll'>
                <div className='row'>
                    {(this.state.fetchingData && this.state.numCoins === 0) ?
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
                    <FlatButton
                        className='col-md-12'
                        onClick={() => this.fetch()}
                        label="Load More" />
                </div>
            </div>
        );
    }
}
PricePage.propTypes = {
    feedSize: PropTypes.number
}
export default PricePage;