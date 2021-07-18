import { SET_FORMS_LIST, DELETE_FORM } from 'redux/constants/formsListConstants';

const formsListReducer = (state = [], action) => {
	switch (action.type) {
		case SET_FORMS_LIST:
			return action.formList;
		case DELETE_FORM:
			return state.filter((item) => item._id !== action.id);
		default:
			return state;
	}
};

export default formsListReducer;
