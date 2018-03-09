import * as types from '../constants/ActionTypes'

export const addFavorite = coinId => ({
    type: types.ADD_FAVORITE,
    coinId
});