import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as dialogConsts from '../constants/Dialogs';

class AddFavoriteDialog extends Component {
    state = {
        textValue: ''
    };

    handleSubmit = () => {
        this.props.addFavorite(this.state.textValue);
        this.props.openDialog(dialogConsts.NO_DIALOG);
    }
    handleTextFieldChange = (e) => {
        this.setState({
            textValue: e.target.value
        });
    };

    render() {
        const actions = [
            <TextField
                hintText="Coin Name"
                onChange={this.handleTextFieldChange}
            />,
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => this.props.openDialog(dialogConsts.NO_DIALOG)}
            />,
            <FlatButton
                label="Add"
                primary={true}
                disabled={this.state.textValue === ''}
                onClick={this.handleSubmit}
            />,
        ];
        return (
            <Dialog
                title="Add Favorite"
                actions={actions}
                modal={true}
                open={this.props.dialog === dialogConsts.ADD_FAVORITE_DIALOG}
            >
                Add any coin that you want to track!
             </Dialog>
        )
    }
}

AddFavoriteDialog.propTypes = {
    addFavorite: PropTypes.func.isRequired,
    openDialog: PropTypes.func.isRequired,
    dialog: PropTypes.string.isRequired
}
export default AddFavoriteDialog;