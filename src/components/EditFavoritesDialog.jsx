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
        let updated = this.state.selected.map(c => {
            if (coin === c.id) {
                let bool = !c.select;
                return {
                    id: c.id,
                    select: bool
                }
            }
            return c;
        });
        this.setState({
            selected: updated
        });
    }
    componentWillReceiveProps() {
        this.setState({
            selected: this.props.favorites.map(f => ({
                id: f.id,
                select: false
            }))
        });
    }
    handleSubmit = () => {
        for (let i = 0; i < this.state.selected.length; i++) {
            if (this.state.selected[i].select) {
                this.props.removeFavorite(this.state.selected[i].id);
            }
        }
        this.props.openDialog(dialogConsts.NO_DIALOG);
        this.setState({ selected: [] });
    }

    handleClose = () => {
        this.setState({ selected: [] });
        this.props.openDialog(dialogConsts.NO_DIALOG);
    }
    shouldDisable = () => {
        for (let i = 0; i < this.state.selected.length; i++) {
            if (this.state.selected[i].select) {
                return false;
            }
        }
        return true;
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => this.handleClose()}
            />,
            < FlatButton
                label="Remove"
                primary={true}
                keyboardFocused={true}
                disabled={this.shouldDisable()}
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
                        key={coin.id}
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