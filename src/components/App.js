import React from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types'
import PricePage from './PricePage';
import NewsPage from './NewsPage';
import FavoritesPage from './FavoritesPage';
import BottomNav from './BottomNav';
import IconButton from 'material-ui/IconButton';
import AddFavoriteDialog from './AddFavoriteDialog';
import EditFavoriteDialog from './EditFavoritesDialog';
import * as dialogConsts from '../constants/Dialogs';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import * as viewsConst from '../constants/Views'
import '../styles/App.css';
import { FontIcon } from 'material-ui';


const App = ({ favoriteCoins, actions, view }) => (
  <div className="wrapper">
    <AppBar
      title={'Crypto Stats'}
      showMenuIconButton={false}
      style={{ position: 'fixed' }}
      iconElementRight={
        <IconButton
          onClick={() => actions.openDialog(dialogConsts.REMOVE_FAVORITE_DIALOG)}
        >{
            view.view === viewsConst.FAVORITE_PAGE ? <FontIcon className="fa fa-cog" /> : null}
        </IconButton>}
    />
    {getPage(view.view, favoriteCoins, actions)}

    <AddFavoriteDialog
      dialog={view.dialog}
      addFavorite={actions.addFavorite}
      openDialog={actions.openDialog}
    />

    <EditFavoriteDialog
      dialog={view.dialog}
      removeFavorite={actions.removeFavorite}
      openDialog={actions.openDialog}
      favorites={favoriteCoins}
    />

    <footer className="foot">
      <Paper zDepth={3} >
        <BottomNav
          view={view}
          changeView={actions.changeView}
        />
      </Paper>
    </footer>
  </div>
);

function getPage(view, favoriteCoins, actions) {
  if (view === viewsConst.PRICE_PAGE) {
    return <PricePage />
  } else if (view === viewsConst.NEWS_PAGE) {
    return <NewsPage />
  } else if (view === viewsConst.FAVORITE_PAGE) {
    return <FavoritesPage
      openDialog={actions.openDialog}
      removeFavorite={actions.removeFavorite}
      favorites={favoriteCoins} />
  }
}

App.propTypes = {
  favoriteCoins: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  view: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  favoriteCoins: state.favorites,
  view: state.views
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

