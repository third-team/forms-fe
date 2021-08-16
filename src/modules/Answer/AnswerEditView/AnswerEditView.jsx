import { useEffect, useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useSmartInput } from 'hooks';

import {
	updateAnswerTextThunkCreator,
	updateIsCorrectThunkCreator,
	removeAnswerThunkCreator,
} from 'redux/thunks/answerThunks';

import './AnswerEditView.scss';

import deleteIcon from 'assets/icons/icon-delete.svg';

import { Button, Input } from 'components';

const AnswerEditView = ({
	questionId,
	answerId,
	answerType,
	answer,
	isCorrect,
	targetRef,
	maxHeight,
	exitDone,
	setAnimationState,
}) => {
	const dispatch = useDispatch();

	const updateAnswerTextInState = useCallback((answerText, objectsIds, undoChanges) => {
		dispatch(updateAnswerTextThunkCreator(answerText, objectsIds, undoChanges));
	}, []);

	const updateIsCorrectInState = useCallback(
		(event) => {
			dispatch(updateIsCorrectThunkCreator(questionId, answerId, answerType, event.target.checked));
		},
		[questionId, answerId, answerType],
	);

	const removeAnswerInState = useCallback(
		() => dispatch(removeAnswerThunkCreator(questionId, answerId, setAnimationState)),
		[questionId, answerId, setAnimationState],
	);

	useEffect(() => {
		if (exitDone) removeAnswerInState();
	}, [exitDone]);

	const [localText, updateLocalText] = useSmartInput(answer, updateAnswerTextInState);

	return (
		<div
			ref={targetRef}
			className='answer-edit-wrapper slide-animation-block'
			style={{
				maxHeight: Number.isInteger(maxHeight) ? `${maxHeight}px` : maxHeight,
			}}
		>
			<div className='answer-edit'>
				<div className='answer-edit__input-control-wrapper'>
					<div className='answer-edit__input-control'>
						<input type={answerType} checked={isCorrect} onChange={updateIsCorrectInState} />
					</div>
				</div>

				<Input
					text={localText}
					inputType='text'
					placeholder='Enter something...'
					inputBlock='answer-edit'
					onChangeCallback={updateLocalText}
					onChangeCallbackProps={[{ questionId, answerId }]}
				/>

				<div className='answer-edit__delete-container'>
					<Button
						content={<img src={deleteIcon} alt='delete answer' />}
						variant='danger'
						onClickCallback={setAnimationState}
						onClickCallbackProps={[false]}
					/>
				</div>
			</div>
		</div>
	);
};

export default memo(AnswerEditView);
