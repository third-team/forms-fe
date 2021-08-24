import { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useSmartInput } from 'hooks';

import { updateAnswerText, updateIsCorrect, removeAnswerStarted } from 'redux/actions/answerActions';

import './AnswerEditView.scss';

import deleteIcon from 'assets/icons/icon-delete.svg';

import { Button, Input } from 'components';

const AnswerEditView = ({ questionId, answerId, answerType, answer, isCorrect, targetRef, maxHeight }) => {
	const dispatch = useDispatch();

	const updateIsCorrectInState = useCallback(
		(event) => {
			dispatch(updateIsCorrect(questionId, answerId, answerType, isCorrect, event.target.checked));
		},
		[questionId, answerId, answerType],
	);

	const removeAnswerInState = useCallback(() => dispatch(removeAnswerStarted(questionId, answerId)), [questionId, answerId]);

	const [localText, updateLocalText] = useSmartInput(answer, updateAnswerText);

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
						onClickCallback={removeAnswerInState}
						onClickCallbackProps={[false]}
					/>
				</div>
			</div>
		</div>
	);
};

export default memo(AnswerEditView);
