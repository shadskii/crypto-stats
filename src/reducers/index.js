import { combineReducers } from 'redux'
import favorites from './favorites'
import views from './views'

const rootReducer = combineReducers({
    favorites,
    views
});

export default rootReducer;