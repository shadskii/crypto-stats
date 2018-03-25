import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import * as dialogConsts from '../constants/Dialogs';

class EditFavoritesDialog extends Component {
    state = {
        selected: []
    }

    select = (coin) => {
        let updated = this.state.selected.concat(coin);
        this.setState({
            selected: updated
        });
    }

    handleSubmit = () => {
        this.props.removeFavorite(this.state.selected[0]);
        this.props.openDialog(dialogConsts.NO_DIALOG);
    }
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => this.props.openDialog(dialogConsts.NO_DIALOG)}
            />,
            < FlatButton
                label="Remove"
                primary={true}
                keyboardFocused={true}
                disabled={this.state.selected.length === 0}
                onClick={() => this.handleSubmit()}
            />,
        ];
        return (
            <Dialog
                title="Edit Favorites"
                actions={actions}
                modal={true}
                open={this.props.dialog === dialogConsts.REMOVE_FAVORITE_DIALOG}
            >
                {this.props.favorites.map((coin, index) => {
                    return <Checkbox
                        label={coin.id}
                        key={index}
                        onCheck={() => this.select(coin.id)}
                    />
                })}
            </Dialog>
        );
    }
}

EditFavoritesDialog.propTypes = {
    removeFavorite: PropTypes.func.isRequired,
    favorites: PropTypes.array.isRequired,
    openDialog: PropTypes.func.isRequired,
    dialog: PropTypes.string.isRequired
}
export default EditFavoritesDialog;