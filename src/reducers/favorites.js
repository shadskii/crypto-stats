import * as types from '../constants/ActionTypes'
import { defineState } from 'redux-localstore'

const defaultState = []
const initialState = defineState(defaultState)('favorites')

export default function favorites(state = initialState, action) {
    switch (action.type) {
        case types.ADD_FAVORITE:
            if (state.map(fav => fav.id).indexOf(action.coinId) < 0) {
                return [
                    ...state,
                    { id: action.coinId }
                ]
            }
            return state;

        case types.REMOVE_FAVORITE:
            console.log(state);
            // let index = state.map(fav => fav.id).indexOf(action.coinId);
            // if (index >= 0) {
            //     return state.splice(index, 1);
            // }
            return state.filter((coin, i) => coin.id !== action.coinId);
        default:
            return state;
    }
}