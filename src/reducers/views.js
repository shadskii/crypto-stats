import * as types from '../constants/ActionTypes'
import * as viewsConst from '../constants/Views'
import * as dialogConst from '../constants/Dialogs'
import { defineState } from 'redux-localstore'

const defaultState = {
    view: viewsConst.FAVORITE_PAGE,
    dialog: dialogConst.NO_DIALOG
}
const initialState = defineState(defaultState)('views')

export default function views(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_VIEW:
            return {
                view: action.view,
                dialog: dialogConst.NO_DIALOG
            }

        case types.OPEN_DIALOG:
            return {
                view: state.view,
                dialog: action.dialog
            }
        default:
            return state;
    }
}