import React, { Component } from 'react';
import PropTypes from 'prop-types'
import CryptoCard from './CryptoCard';
import CircularProgress from 'material-ui/CircularProgress';

const API = "https://api.coinmarketcap.com/v1/ticker/";
class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coin: [],
            fetchingData: true
        };
    }

    load() {
        var _this = this;
        fetch(API + this.props.coinId + '/')
            .then(result => {
                if (result.ok) {
                    return result.json();
                }
                throw new Error("Not a valid coin");
            })
            .then(items => {
                _this.setState({
                    coin: items.slice(0, 1),
                    fetchingData: false
                });
            }).catch(error => {
                this.props.removeFavorite();
                console.log(error);
            });
    }

    componentDidMount() {
        this.load();
    }
    render() {
        return (
            <div className='row'>
                {this.state.fetchingData ?
                    (<div className='center-content'>
                        <CircularProgress size={80} thickness={7} />
                    </div>)
                    :
                    (this.state.coin.map(function (el, index) {
                        return <div key={index} className='col-lg-12'>
                            <CryptoCard info={el} />
                        </div>
                    }))
                }
            </div>
        );
    }
}

Favorite.propTypes = {
    coinId: PropTypes.string.isRequired,
    removeFavorite: PropTypes.func.isRequired
}

export default Favorite;