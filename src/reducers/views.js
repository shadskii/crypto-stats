import * as types from '../constants/ActionTypes'
import * as viewsConst from '../constants/Views'
import { defineState } from 'redux-localstore'

const defaultState = {
    view: viewsConst.FAVORITE_PAGE
}
const initialState = defineState(defaultState)('views')

export default function views(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_VIEW:
            return {
                view: action.view
            }

        default:
            return state;
    }
}