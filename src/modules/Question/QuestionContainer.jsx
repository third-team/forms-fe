import { useEffect } from 'react';
import { connect } from 'react-redux';

import {
	updateQuestionTextThunkCreator,
	changeAnswerTypeThunkCreator,
	removeQuestionThunkCreator,
} from 'redux/thunks/questionThunks';

import { addAnswerThunkCreator } from 'redux/thunks/answerThunks';

import Question from './Question';

const QuestionContainer = ({
	formId,
	questionId,
	question,
	answers,
	answerType,
	updateQuestionTextInState,
	changeAnswerTypeInState,
	removeQuestionInState,
	addAnswerInState,
	exitDone,
	setAnimationState,
	...props
}) => {
	useEffect(() => {
		if (exitDone) removeQuestionInState(questionId, setAnimationState);
	}, [exitDone]);

	const addAnswer = () => {
		addAnswerInState(questionId);
	};

	return (
		<Question
			formId={formId}
			questionId={questionId}
			question={question}
			answers={answers}
			answerType={answerType}
			updateQuestionTextInState={updateQuestionTextInState}
			changeAnswerTypeInState={changeAnswerTypeInState}
			addAnswerInState={addAnswer}
			setAnimationState={setAnimationState}
			{...props}
		/>
	);
};

const mapStateToProps = (state) => ({
	formId: state.form._id,
});

const mapDispatchToProps = (dispatch) => ({
	updateQuestionTextInState: (question, objectsIds, undoTextUpdate) => {
		dispatch(updateQuestionTextThunkCreator(question, objectsIds, undoTextUpdate));
	},
	changeAnswerTypeInState: (formId, questionId, answerType) => {
		dispatch(changeAnswerTypeThunkCreator(formId, questionId, answerType));
	},
	removeQuestionInState: (questionId, setAnimationState) => {
		dispatch(removeQuestionThunkCreator(questionId, setAnimationState));
	},
	addAnswerInState: (questionId) => {
		dispatch(addAnswerThunkCreator(questionId));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);
