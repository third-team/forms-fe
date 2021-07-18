import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { userReducer, formReducer, formsListReducer } from 'redux/reducers';

const rootReducer = combineReducers({
	user: userReducer,
	formsList: formsListReducer,
	form: formReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
