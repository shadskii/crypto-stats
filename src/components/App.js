import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { CryptoCard } from './CryptoCard';
import { Icon } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import CachedIcon from 'material-ui-icons/Cached';

import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import '../styles/App.css';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

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
        <div className="wrapper">
          <AppBar
            title={<span>Crypto Stats</span>}
            showMenuIconButton={false}
            iconElementRight={
              <IconButton onClick={() => this.refresh(10)} aria-label="Delete">
                <CachedIcon />
              </IconButton>
            }
          />
          <div className="container content-scroll">
            <div>
              {this.state.coinStats.map(function (el, index) {
                return <CryptoCard info={el} key={index} />
              })}
            </div>
          </div>
          <Paper zDepth={3}>
            <BottomNavigation selectedIndex={this.state.selectedIndex}>
              <BottomNavigationItem
                label="Recents"
                icon={recentsIcon}
                onClick={() => this.select(0)}
              />
              <BottomNavigationItem
                label="Favorites"
                icon={favoritesIcon}
                onClick={() => this.select(1)}
              />
              <BottomNavigationItem
                label="Nearby"
                icon={nearbyIcon}
                onClick={() => this.select(2)}
              />
            </BottomNavigation>
          </Paper>
        </div>
      </MuiThemeProvider >
    );
  }
}

export default App;
