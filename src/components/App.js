import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

import PricePage from './PricePage';
import NewsPage from './NewsPage';
import { Switch, Route, withRouter } from 'react-router-dom'
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import '../styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    let BottomNav = withRouter(({ history, location }) =>
      <BottomNavigation selectedIndex={location.pathname === '/news' ? 1 : 0}>
        <BottomNavigationItem
          label="Prices"
          icon={<FontIcon className="fa fa-line-chart" />}
          onClick={() => {
            console.log(location);
            history.push('/');
          }}
        />
        <BottomNavigationItem
          label="News"
          icon={<FontIcon className="fa fa-newspaper-o" />}
          onClick={() => {
            history.push('/news');
          }}
        />
      </BottomNavigation>
    );

    return (

      <div className="wrapper">
        <AppBar
          title={<span>Crypto Stats</span>}
          showMenuIconButton={false}
          style={{ position: 'fixed' }}

        />

        <Switch>
          <Route exact path='/' component={PricePage} />
          <Route path='/news' component={NewsPage} />
        </Switch>

        <footer className="foot">
          <Paper zDepth={3} >
            <BottomNav />
          </Paper>
        </footer>
      </div>
    );
  }
}

export default App;
