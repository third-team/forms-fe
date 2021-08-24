import { SET_IS_AUTH_STARTED, SET_IS_AUTH_SUCCESS, SET_IS_AUTH_FAILURE } from 'redux/constants/userConstants';

const userReducer = (state = { loading: null, isAuth: undefined }, action) => {
	switch (action.type) {
		case SET_IS_AUTH_STARTED:
			return {
				...state,
				loading: true,
			};
		case SET_IS_AUTH_SUCCESS:
			return {
				...state,
				loading: false,
				isAuth: action.payload.isAuth,
			};
		case SET_IS_AUTH_FAILURE:
			return {
				...state,
				loading: false,
			};

		default:
			return state;
	}
};

export default userReducer;
