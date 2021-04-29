import { combineReducers } from 'redux';

import { v1 as uuid } from 'uuid';

import {
	ADD_QUESTION,
	UPDATE_QUESTION_TEXT,
	CHANGE_ANSWER_TYPE,
	REMOVE_QUESTION,
	ADD_ANSWER,
	UPDATE_ANSWER_TEXT,
	UPDATE_IS_CORRECT,
	REMOVE_ANSWER,
} from './actions';

const initialState = {
	questions: [{ id: uuid(), name: '', answerType: 'checkbox', answers: [{ id: uuid(), answer: '', isCorrect: false }] }],
};

const questionReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_QUESTION:
			return {
				...state,
				questions: state.questions.concat([
					{ id: uuid(), name: '', answerType: 'checkbox', answers: [{ id: uuid(), answer: '', isCorrect: false }] },
				]),
			};

		case UPDATE_QUESTION_TEXT:
			return {
				...state,
				questions: state.questions.map((question, questionIndex) =>
					questionIndex === action.questionIndex ? { ...question, name: action.text } : question,
				),
			};

		case CHANGE_ANSWER_TYPE:
			return {
				...state,
				questions: state.questions.map((question, questionIndex) => {
					if (questionIndex === action.questionIndex) {
						return {
							...question,
							answerType: action.answerType,
							answers: question.answers.map((answer) => ({ ...answer, isCorrect: false })),
						};
					}
					return question;
				}),
			};

		case REMOVE_QUESTION:
			return {
				...state,
				questions: state.questions.filter((_, questionIndex) => questionIndex !== action.questionIndex),
			};

		case ADD_ANSWER:
			return {
				...state,
				questions: state.questions.map((question, questionIndex) =>
					questionIndex === action.questionIndex
						? { ...question, answers: question.answers.concat([{ id: uuid(), answer: '', isCorrect: false }]) }
						: question,
				),
			};

		case UPDATE_ANSWER_TEXT:
			return {
				...state,
				questions: state.questions.map((question, questionIndex) => {
					if (questionIndex === action.questionIndex) {
						return {
							...question,
							answers: question.answers.map((item, answerIndex) =>
								answerIndex === action.answerIndex ? { ...item, answer: action.text } : item,
							),
						};
					}
					return question;
				}),
			};

		case UPDATE_IS_CORRECT:
			console.log(action);
			return {
				...state,
				questions: state.questions.map((question, questionIndex) => {
					if (questionIndex === action.questionIndex) {
						return {
							...question,
							answers: question.answers.map((answer, answerIndex) => {
								if (answerIndex === action.answerIndex) return { ...answer, isCorrect: action.checked };
								return action.answerType === 'checkbox' ? answer : { ...answer, isCorrect: false };
							}),
						};
					}
					return question;
				}),
			};

		case REMOVE_ANSWER:
			return {
				...state,
				questions: state.questions.map((question, questionIndex) => {
					if (questionIndex === action.questionIndex) {
						return { ...question, answers: question.answers.filter((_, answerIndex) => answerIndex !== action.answerIndex) };
					}
					return question;
				}),
			};

		default:
			return state;
	}
};

const appReducer = combineReducers({ questions: questionReducer });

export default appReducer;
