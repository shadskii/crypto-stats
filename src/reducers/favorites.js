import * as types from '../constants/ActionTypes'
import { defineState } from 'redux-localstore'

const defaultState = []
const initialState = defineState(defaultState)('favorites')

export default function favorites(state = initialState, action) {
    switch (action.type) {
        case types.ADD_FAVORITE:
            return [
                ...state,
                { id: action.coinId }
            ]

        default:
            return state;
    }
}