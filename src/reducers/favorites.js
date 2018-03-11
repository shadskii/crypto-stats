import * as types from '../constants/ActionTypes'

const initialState = [
    { id: 'bitcoin' }
]

export default function favorites(state = initialState, action) {
    console.log(action);
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