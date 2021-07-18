import { SET_IS_AUTH } from 'redux/constants/userConstants';

const initialState = {
	isAuth: undefined,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_IS_AUTH:
			return {
				...state,
				isAuth: action.isAuth,
			};

		default:
			return state;
	}
};

export default userReducer;
