import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddFavoriteDialog from './AddFavoriteDialog';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Favorite from './Favorite';
import CircularProgress from 'material-ui/CircularProgress';
const style = {
    position: 'fixed',
    bottom: 80,
    right: 25,
};

class FavoritesPage extends Component {
    state = {
        open: false,
        coins: ['bitcoin']
    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        const actions = [
            <TextField
                hintText="Coin Name"
            />,
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Add"
                primary={true}
                onClick={this.handleClose}
            />,
        ];
        return <div >
            <div className='container-fluid content-scroll'>
                <div className='row'>
                    {this.state.fetchingData ?
                        (<div className='center-content'>
                            <CircularProgress size={80} thickness={7} />
                        </div>)
                        :
                        (this.state.coins.map(function (el, index) {
                            return <div key={index} className='col-md-6'>
                                <Favorite coinId={el} />
                            </div>
                        }))
                    }
                </div>
            </div>
            <Dialog
                title="Add Favorite"
                actions={actions}
                modal={true}
                open={this.state.open}
            >
                Add any coin that you want to track!
        </Dialog>
            <FloatingActionButton style={style} onClick={this.handleOpen}>
                <ContentAdd />
            </FloatingActionButton>
        </div>
    }
};

export default FavoritesPage;