import React, { Component } from 'react';
import PropTypes from 'prop-types'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Favorite from './Favorite';
import * as dialogConsts from '../constants/Dialogs';

const style = {
    position: 'fixed',
    bottom: 80,
    right: 25,
};

class FavoritesPage extends Component {
    render() {
        return <div >
            <div className='container-fluid content-scroll'>
                <div className='row'>
                    {this.props.favorites.map((coin, index) =>
                        <div key={index} className='col-md-6'>
                            <Favorite
                                coinId={coin.id}
                                removeFavorite={() => this.props.removeFavorite(coin.id)}
                            />
                        </div>)}
                </div>
            </div>
            <FloatingActionButton
                style={style}
                onClick={() => this.props.openDialog(dialogConsts.ADD_FAVORITE_DIALOG)}>
                <ContentAdd />
            </FloatingActionButton>
        </div >
    }
};

FavoritesPage.propTypes = {
    openDialog: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired,
    favorites: PropTypes.array.isRequired
}

export default FavoritesPage;