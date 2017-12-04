import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { CryptoCard } from './CryptoCard';
import NewsPage from './NewsPage';
import { Icon } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import CachedIcon from 'material-ui-icons/Cached';

import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import '../styles/App.css';

export const API = "https://api.coinmarketcap.com/v1/ticker/?limit=";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      coinStats: []
    };
  }
  select = (index) => this.setState({ selectedIndex: index });

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
    let content = null;
    if (this.state.selectedIndex === 0) {
      content = <div>
        {this.state.coinStats.map(function (el, index) {
          return <CryptoCard info={el} key={index} />
        })}
      </div>
    } else {
      content = <NewsPage />
    }


    return (
      <MuiThemeProvider>
        <div className="wrapper">
          <AppBar
            title={<span>Crypto Stats</span>}
            showMenuIconButton={false}
            iconElementRight={
              <IconButton onClick={() => this.refresh(50)} aria-label="Delete">
                <CachedIcon />
              </IconButton>
            }
          />
          <div className="container content-scroll">
            {content}
          </div>

          <Paper zDepth={3}>
            <BottomNavigation selectedIndex={this.state.selectedIndex}>
              <BottomNavigationItem
                label="Prices"
                icon={<FontIcon className="fa fa-line-chart" />}
                onClick={() => this.select(0)}
              />
              <BottomNavigationItem
                label="News"
                icon={<FontIcon className="fa fa-newspaper-o" />}
                onClick={() => this.select(1)}
              />
            </BottomNavigation>
          </Paper>
        </div>
      </MuiThemeProvider >
    );
  }
}

export default App;
