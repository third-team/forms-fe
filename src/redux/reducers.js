import { combineReducers } from 'redux';

import {
	SET_FORMS_LIST,
	UPDATE_FORM_TEXT,
	ADD_QUESTION,
	UPDATE_QUESTION_TEXT,
	CHANGE_ANSWER_TYPE,
	REMOVE_QUESTION,
	ADD_ANSWER,
	UPDATE_ANSWER_TEXT,
	UPDATE_IS_CORRECT,
	REMOVE_ANSWER,
	INITIALIZE_FORM_STATE,
	CLEAN_FORM_STATE,
	REMOVE_FORM,
} from './actions';

const formsListReducer = (state = [], action) => {
	switch (action.type) {
		case SET_FORMS_LIST:
			return action.formList;
		case REMOVE_FORM:
			return state.filter((item) => item._id !== action.id);
		default:
			return state;
	}
};

const formReducer = (state = {}, action) => {
	switch (action.type) {
		case INITIALIZE_FORM_STATE:
			return { ...state, name: action.form.name, _id: action.form._id };

		case UPDATE_FORM_TEXT:
			return { ...state, name: action.name };

		case CLEAN_FORM_STATE:
			return {};

		default:
			return state;
	}
};

const questionReducer = (state = {}, action) => {
	switch (action.type) {
		case INITIALIZE_FORM_STATE:
			return { ...state, questions: action.form.questions };
		case ADD_QUESTION:
			return {
				...state,
				questions: state.questions.concat([{ _id: action.questionId, question: 'Question', answerType: 'checkbox', answers: [] }]),
			};

		case UPDATE_QUESTION_TEXT:
			return {
				...state,
				questions: state.questions.map((questionItem) =>
					questionItem._id === action.questionId ? { ...questionItem, question: action.text } : questionItem,
				),
			};

		case CHANGE_ANSWER_TYPE:
			return {
				...state,
				questions: state.questions.map((questionItem) => {
					if (questionItem._id === action.questionId) {
						return {
							...questionItem,
							answerType: action.answerType,
							answers: questionItem.answers.map((answer) => ({ ...answer, isCorrect: false })),
						};
					}

					return questionItem;
				}),
			};

		case REMOVE_QUESTION:
			return {
				...state,
				questions: state.questions.filter((questionItem) => questionItem._id !== action.questionId),
			};

		case ADD_ANSWER:
			return {
				...state,
				questions: state.questions.map((questionItem) =>
					questionItem._id === action.questionId
						? { ...questionItem, answers: questionItem.answers.concat([{ _id: action.answerId, answer: 'Answer', isCorrect: false }]) }
						: questionItem,
				),
			};

		case UPDATE_ANSWER_TEXT:
			return {
				...state,
				questions: state.questions.map((questionItem) => {
					if (questionItem._id === action.questionId) {
						return {
							...questionItem,
							answers: questionItem.answers.map((answerItem) =>
								answerItem._id === action.answerId ? { ...answerItem, answer: action.answer } : answerItem,
							),
						};
					}
					return questionItem;
				}),
			};

		case UPDATE_IS_CORRECT:
			return {
				...state,
				questions: state.questions.map((questionItem) => {
					if (questionItem._id === action.questionId) {
						return {
							...questionItem,
							answers: questionItem.answers.map((answerItem) => {
								if (answerItem._id === action.answerId) return { ...answerItem, isCorrect: action.checked };
								return action.answerType === 'checkbox' ? answerItem : { ...answerItem, isCorrect: false };
							}),
						};
					}
					return questionItem;
				}),
			};

		case REMOVE_ANSWER:
			return {
				...state,
				questions: state.questions.map((questionItem) => {
					if (questionItem._id === action.questionId) {
						return { ...questionItem, answers: questionItem.answers.filter((answerItem) => answerItem._id !== action.answerId) };
					}
					return questionItem;
				}),
			};

		case CLEAN_FORM_STATE:
			return {};

		default:
			return state;
	}
};

const appReducer = combineReducers({ formsList: formsListReducer, form: formReducer, questions: questionReducer });

export default appReducer;
