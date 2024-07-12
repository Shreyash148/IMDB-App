import { createStore, combineReducers } from 'redux';
import {formReducer} from './reducers/movieReducer';
import personFormReducer from './reducers/personReducer';

const rootReducer = combineReducers({
  form: formReducer,
  personForm: personFormReducer
});

const store = createStore(rootReducer);

export default store;
