import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { Switch, Route } from 'react-router-dom'
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types'
import PricePage from './PricePage';
import NewsPage from './NewsPage';
import FavoritesPage from './FavoritesPage';
import BottomNav from './BottomNav';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import '../styles/App.css';



const App = ({ favoriteCoins, actions }) => (
  <div className="wrapper">
    <AppBar
      title={'Crypto Stats'}
      showMenuIconButton={false}
      style={{ position: 'fixed' }}
    />

    <Switch>
      <Route exact path='/'>
        <PricePage />
      </Route>
      <Route path='/news'>
        <NewsPage />
      </Route>
      <Route path='/favorites'>
        <FavoritesPage
          addFavorite={actions.addFavorite}
          favorites={favoriteCoins} />
      </Route>
    </Switch>

    <footer className="foot">
      <Paper zDepth={3} >
        <BottomNav />
      </Paper>
    </footer>
  </div>
);
App.propTypes = {
  favoriteCoins: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  favoriteCoins: state.favorites
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

