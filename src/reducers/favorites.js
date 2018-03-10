import * as types from '../constants/ActionTypes'

const initialState = [
    {

    }
]

export default function favorites(state = initialState, action) {
    switch (action.types) {
        case types.ADD_FAVORITE:
            return [
                ...state,
                {
                    coinId: action.coinId
                }
            ]

        default:
            return state;
    }
}