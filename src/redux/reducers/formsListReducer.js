import {
	GET_FORMS_LIST_STARTED,
	GET_FORMS_LIST_SUCCESS,
	GET_FORMS_LIST_FAILURE,
	DELETE_FORM_STARTED,
	DELETE_FORM_SUCCESS,
	DELETE_FORM_FAILURE,
} from 'redux/constants/formsListConstants';

const formsListReducer = (state = { loading: null, forms: undefined }, action) => {
	switch (action.type) {
		case GET_FORMS_LIST_STARTED:
			return { ...state, loading: true };
		case GET_FORMS_LIST_SUCCESS:
			return { ...state, loading: false, forms: action.payload.forms };
		case GET_FORMS_LIST_FAILURE:
			return { ...state, loading: false };

		case DELETE_FORM_STARTED:
			return {
				...state,
				forms: state.forms.map((form) => (form._id === action.payload.formId ? { ...form, animation: false } : form)),
			};
		case DELETE_FORM_SUCCESS:
			return { ...state, forms: state.forms.filter((form) => form._id !== action.payload.formId) };
		case DELETE_FORM_FAILURE:
			return {
				...state,
				forms: state.forms.map((form) => (form._id === action.payload.formId ? { ...form, animation: true } : form)),
			};

		default:
			return state;
	}
};

export default formsListReducer;
