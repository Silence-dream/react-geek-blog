import { combineReducers } from 'redux';

import article from './article';
import user from './user';
const rootReducer = combineReducers({
  user,
  article,
});

export default rootReducer;
