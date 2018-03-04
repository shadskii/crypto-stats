import React, { Component } from 'react';
import { CryptoCard } from './CryptoCard';
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
                console.log(items);
                _this.setState({
                    coin: items,
                    fetchingData: false
                });
            }).catch(error => console.log(error));
    }

    componentDidMount() {
        this.load();
    }
    render() {
        return (

            <div className='row'>
                {this.state.fetchingData ?
                    (<div className='center-content'>
                    </div>)
                    :
                    (this.state.coin.slice(0, 1).map(function (el, index) {
                        return <div key={index} className='col-md-6'>
                            <CryptoCard info={el} />
                        </div>
                    }))
                }
            </div>
        );
    }
}
export default Favorite;