import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CryptoCard } from './CryptoCard';

const API = "https://api.coinmarketcap.com/v1/ticker/?limit=";
class PricePage extends Component {
    static defaultProps = {
        feedSize: 50
    }
    constructor(props) {
        super(props);
        this.state = {
            coinStats: []
        };
    }
    refresh() {
        var _this = this;
        fetch(API + this.props.feedSize)
            .then(result => result.json())
            .then(items => {
                _this.setState({
                    coinStats: items
                });
            })
        console.log('Refreshing prices!')
    }

    componentDidMount() {
        this.refresh(this.props.feedSize);
    }

    render() {
        return (
            <div>
                {this.state.coinStats.map(function (el, index) {
                    return <CryptoCard info={el} key={index} />
                })}
            </div>
        );
    }
}
PricePage.propTypes = {
    feedSize: PropTypes.number
}
export default PricePage;