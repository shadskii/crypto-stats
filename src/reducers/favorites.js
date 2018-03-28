import * as types from '../constants/ActionTypes'
import { defineState } from 'redux-localstore'

const defaultState = []
const initialState = defineState(defaultState)('favorites')

export default function favorites(state = initialState, action) {
    switch (action.type) {
        case types.ADD_FAVORITE:
            if (state.map(fav => fav.id.toUpperCase()).indexOf(action.coinId.toUpperCase()) < 0) {
                return [
                    ...state,
                    { id: action.coinId.toUpperCase() }
                ]
            }
            return state;

        case types.REMOVE_FAVORITE:
            return state.filter(i => i.id.toUpperCase() !== action.coinId.toUpperCase());
        default:
            return state;
    }
}
