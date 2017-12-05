import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PricePage from './PricePage';
import NewsPage from './NewsPage';
import { Icon } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import CachedIcon from 'material-ui-icons/Cached';

import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import '../styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }
  select = (index) => this.setState({ selectedIndex: index });

  render() {
    let content = null;
    if (this.state.selectedIndex === 0) {
      content = <PricePage ref={(onRef) => { this.prices = onRef; }} />
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
              <IconButton onClick={() => this.prices.refresh(50)} aria-label="Refresh">
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
