import React, { Component } from 'react';
import { CryptoCard } from './CryptoCard';

const API = "https://api.coinmarketcap.com/v1/ticker/?limit=";
class PricePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coinStats: []
        };
    }
    refresh(num) {
        var _this = this;
        if (num > 0) {
            fetch(API + num)
                .then(result => result.json())
                .then(items => {
                    _this.setState({
                        coinStats: items
                    });
                })
        }
        console.log('Refreshing prices!')
    }

    componentDidMount() {
        this.refresh(50);
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
export default PricePage;