import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { Switch, Route } from 'react-router-dom'
import Paper from 'material-ui/Paper';

import PricePage from './PricePage';
import NewsPage from './NewsPage';
import BottomNav from './BottomNav';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <AppBar
          title={'Crypto Stats'}
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
