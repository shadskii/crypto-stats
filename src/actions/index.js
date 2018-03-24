import * as types from '../constants/ActionTypes'

export const addFavorite = coinId => ({
    type: types.ADD_FAVORITE,
    coinId
});

export const removeFavorite = coinId => ({
    type: types.REMOVE_FAVORITE,
    coinId
});

export const changeView = view => ({
    type: types.CHANGE_VIEW,
    view: view
});

export const openDialog = dialog => ({
    type: types.OPEN_DIALOG,
    dialog: dialog
});