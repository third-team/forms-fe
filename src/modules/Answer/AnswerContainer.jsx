import { useEffect } from 'react';
import { connect } from 'react-redux';

import { updateAnswerTextThunkCreator, updateIsCorrectThunkCreator, removeAnswerThunkCreator } from 'redux/thunks/answerThunks';

import Answer from './Answer';

const AnswerContainer = ({
	questionId,
	answerId,
	answerType,
	updateAnswerTextInState,
	updateIsCorrectInState,
	removeAnswerInState,
	exitDone,
	setAnimationState,
	...props
}) => {
	const updateIsCorrect = (checked) => {
		updateIsCorrectInState(questionId, answerId, answerType, checked);
	};

	useEffect(() => {
		if (exitDone) removeAnswerInState(questionId, answerId, setAnimationState);
	}, [exitDone]);

	return (
		<Answer
			questionId={questionId}
			answerId={answerId}
			answerType={answerType}
			updateAnswerTextInState={updateAnswerTextInState}
			updateIsCorrectInState={updateIsCorrect}
			setAnimationState={setAnimationState}
			{...props}
		/>
	);
};

const mapDispatchToProps = (dispatch) => ({
	updateAnswerTextInState: (answer, objectsIds, undoChanges) => {
		dispatch(updateAnswerTextThunkCreator(answer, objectsIds, undoChanges));
	},
	updateIsCorrectInState: (questionId, answerId, answerType, checked) => {
		dispatch(updateIsCorrectThunkCreator(questionId, answerId, answerType, checked));
	},
	removeAnswerInState: (questionId, answerId, setAnimationState) => {
		dispatch(removeAnswerThunkCreator(questionId, answerId, setAnimationState));
	},
});

export default connect(null, mapDispatchToProps)(AnswerContainer);
