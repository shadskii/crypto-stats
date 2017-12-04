import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { CryptoCard } from './CryptoCard';
import { Icon } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import CachedIcon from 'material-ui-icons/Cached';
import '../styles/App.css';

export const API = "https://api.coinmarketcap.com/v1/ticker/?limit=";

class App extends Component {

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
  }

  componentDidMount() {
    this.refresh(50);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={<span>Crypto Stats</span>}
            showMenuIconButton={false}
            iconElementRight={
              <IconButton onClick={() => this.refresh(10)} aria-label="Delete">
                <CachedIcon />
              </IconButton>
            }
          />
          <div className="container">
            {this.state.coinStats.map(function (el, index) {
              return <CryptoCard info={el} key={index} />
            })}
          </div>
        </div>
      </MuiThemeProvider >
    );
  }
}

export default App;
