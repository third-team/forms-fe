import {
	GET_FORM_STARTED,
	GET_FORM_SUCCESS,
	GET_FORM_FAILURE,
	UPDATE_FORM_TEXT_SUCCESS,
	CLEAN_FORM,
} from 'redux/constants/formConstants';

import {
	ADD_QUESTION_STARTED,
	ADD_QUESTION_SUCCESS,
	ADD_QUESTION_FAILURE,
	UPDATE_QUESTION_TEXT_SUCCESS,
	CHANGE_ANSWER_TYPE_SUCCESS,
	REMOVE_QUESTION_STARTED,
	REMOVE_QUESTION_SUCCESS,
	REMOVE_QUESTION_FAILURE,
} from 'redux/constants/questionConstants';

import {
	ADD_ANSWER_STARTED,
	ADD_ANSWER_SUCCESS,
	ADD_ANSWER_FAILURE,
	UPDATE_ANSWER_TEXT_SUCCESS,
	UPDATE_IS_CORRECT_SUCCESS,
	REMOVE_ANSWER_STARTED,
	REMOVE_ANSWER_SUCCESS,
	REMOVE_ANSWER_FAILURE,
} from 'redux/constants/answerConstants';

const formReducer = (state = { loading: null, _id: undefined, questions: undefined }, action) => {
	switch (action.type) {
		case GET_FORM_STARTED:
			return { ...state, loading: true };
		case GET_FORM_SUCCESS:
			return { ...state, ...action.payload, loading: false };
		case GET_FORM_FAILURE:
			return { ...state, loading: false };

		case UPDATE_FORM_TEXT_SUCCESS:
			return { ...state, name: action.payload.formName };

		case CLEAN_FORM:
			return {};

		case ADD_QUESTION_STARTED:
			return {
				...state,
				questions: state.questions.concat({
					_uuid: action.payload.questionUuid,
					animation: true,
					question: 'Question',
					answerType: 'checkbox',
					answers: [],
				}),
			};
		case ADD_QUESTION_SUCCESS:
			return {
				...state,
				questions: state.questions.map((question) =>
					question._uuid === action.payload.questionUuid ? { ...question, _id: action.payload.questionId } : question,
				),
			};
		case ADD_QUESTION_FAILURE:
			return {
				...state,
				questions: state.questions.map((question) =>
					question._uuid === action.payload.questionUuid ? { ...question, animation: false } : question,
				),
			};

		case UPDATE_QUESTION_TEXT_SUCCESS:
			return {
				...state,
				questions: state.questions.map((questionItem) =>
					questionItem._id === action.payload.questionId ? { ...questionItem, question: action.payload.text } : questionItem,
				),
			};

		case CHANGE_ANSWER_TYPE_SUCCESS:
			return {
				...state,
				questions: state.questions.map((questionItem) => {
					if (questionItem._id === action.payload.questionId) {
						return {
							...questionItem,
							answerType: action.payload.answerType,
							answers: questionItem.answers.map((answer) => ({ ...answer, isCorrect: false })),
						};
					}

					return questionItem;
				}),
			};

		case REMOVE_QUESTION_STARTED:
			return {
				...state,
				questions: state.questions.map((question) =>
					question._id === action.payload.questionId ? { ...question, animation: false } : question,
				),
			};
		case REMOVE_QUESTION_SUCCESS:
			return {
				...state,
				questions: state.questions.filter((questionItem) => questionItem._id !== action.payload.questionId),
			};
		case REMOVE_QUESTION_FAILURE:
			return {
				...state,
				questions: state.questions.map((question) =>
					question._id === action.payload.questionId ? { ...question, animation: true } : question,
				),
			};

		case ADD_ANSWER_STARTED:
			return {
				...state,
				questions: state.questions.map((questionItem) =>
					questionItem._id === action.payload.questionId
						? {
								...questionItem,
								answers: questionItem.answers.concat({
									_uuid: action.payload.answerUuid,
									animation: true,
									answer: 'Answer',
									isCorrect: false,
								}),
						  }
						: questionItem,
				),
			};
		case ADD_ANSWER_SUCCESS:
			return {
				...state,
				questions: state.questions.map((questionItem) =>
					questionItem._id === action.payload.questionId
						? {
								...questionItem,
								answers: questionItem.answers.map((answer) =>
									answer._uuid === action.payload.answerUuid ? { ...answer, _id: action.payload.answerId } : answer,
								),
						  }
						: questionItem,
				),
			};
		case ADD_ANSWER_FAILURE:
			return {
				...state,
				questions: state.questions.map((questionItem) =>
					questionItem._id === action.questionId
						? {
								...questionItem,
								answers: questionItem.answers.map((answer) =>
									answer._uuid === action.payload.answerUuid ? { ...answer, animation: false } : answer,
								),
						  }
						: questionItem,
				),
			};

		case UPDATE_ANSWER_TEXT_SUCCESS:
			return {
				...state,
				questions: state.questions.map((questionItem) => {
					if (questionItem._id === action.payload.questionId) {
						return {
							...questionItem,
							answers: questionItem.answers.map((answerItem) =>
								answerItem._id === action.payload.answerId ? { ...answerItem, answer: action.payload.answer } : answerItem,
							),
						};
					}
					return questionItem;
				}),
			};

		case UPDATE_IS_CORRECT_SUCCESS:
			return {
				...state,
				questions: state.questions.map((questionItem) => {
					if (questionItem._id === action.payload.questionId) {
						return {
							...questionItem,
							answers: questionItem.answers.map((answerItem) => {
								if (answerItem._id === action.payload.answerId) return { ...answerItem, isCorrect: action.payload.checked };
								return action.payload.answerType === 'checkbox' ? answerItem : { ...answerItem, isCorrect: false };
							}),
						};
					}
					return questionItem;
				}),
			};

		case REMOVE_ANSWER_STARTED:
			return {
				...state,
				questions: state.questions.map((questionItem) => {
					if (questionItem._id === action.payload.questionId) {
						return {
							...questionItem,
							answers: questionItem.answers.map((answerItem) =>
								answerItem._id === action.payload.answerId ? { ...answerItem, animation: false } : answerItem,
							),
						};
					}
					return questionItem;
				}),
			};
		case REMOVE_ANSWER_SUCCESS:
			return {
				...state,
				questions: state.questions.map((questionItem) => {
					if (questionItem._id === action.payload.questionId) {
						return {
							...questionItem,
							answers: questionItem.answers.filter((answerItem) => answerItem._id !== action.payload.answerId),
						};
					}
					return questionItem;
				}),
			};
		case REMOVE_ANSWER_FAILURE:
			return {
				...state,
				questions: state.questions.map((questionItem) => {
					if (questionItem._id === action.payload.questionId) {
						return {
							...questionItem,
							answers: questionItem.answers.map((answerItem) =>
								answerItem._id === action.payload.answerId ? { ...answerItem, animation: true } : answerItem,
							),
						};
					}
					return questionItem;
				}),
			};

		default:
			return state;
	}
};

export default formReducer;
