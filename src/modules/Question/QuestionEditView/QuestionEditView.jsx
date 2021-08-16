import { useEffect, useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useSmartInput } from 'hooks';

import {
	updateQuestionTextThunkCreator,
	changeAnswerTypeThunkCreator,
	removeQuestionThunkCreator,
} from 'redux/thunks/questionThunks';

import { addAnswerThunkCreator } from 'redux/thunks/answerThunks';

import './QuestionEditView.scss';

import { Button, Input } from 'components';

import { AnswerEditView as Answer } from 'modules';

const QuestionEditView = ({
	formId,
	questionId,
	question,
	answerType,
	answers,
	targetRef,
	maxHeight,
	exitDone,
	setAnimationState,
}) => {
	const dispatch = useDispatch();

	const updateQuestionTextInState = useCallback((questionText, objectsIds, undoTextUpdate) => {
		dispatch(updateQuestionTextThunkCreator(questionText, objectsIds, undoTextUpdate));
	}, []);
	const changeAnswerTypeInState = useCallback(
		(event) => {
			dispatch(changeAnswerTypeThunkCreator(formId, questionId, event.target.value));
		},
		[formId, questionId, answerType],
	);
	const removeQuestionInState = useCallback(() => {
		dispatch(removeQuestionThunkCreator(questionId, setAnimationState));
	}, [questionId, setAnimationState]);
	const addAnswerInState = useCallback(() => {
		dispatch(addAnswerThunkCreator(questionId));
	}, [questionId]);

	const [localText, updateLocalText] = useSmartInput(question, updateQuestionTextInState);

	useEffect(() => {
		if (exitDone) removeQuestionInState(questionId, setAnimationState);
	}, [exitDone]);

	return (
		<div
			ref={targetRef}
			className='question-edit-wrapper slide-animation-block'
			style={{
				maxHeight: Number.isInteger(maxHeight) ? `${maxHeight}px` : 'max-content',
			}}
		>
			<div className='question-edit'>
				<div className='question-edit__parameters-line'>
					<Input
						text={localText}
						inputType='text'
						placeholder='Enter something...'
						inputBlock='question-edit'
						onChangeCallback={updateLocalText}
						onChangeCallbackProps={[{ formId, questionId }]}
					/>

					<select
						value={answerType}
						size='large'
						className='input question-edit__selector'
						onChange={(event) => {
							changeAnswerTypeInState(event);
						}}
					>
						<option value='checkbox'>Checkbox</option>
						<option value='radio'>Radiobutton</option>
					</select>
				</div>

				{answers.map((answerItem) => (
					<Answer
						questionId={questionId}
						answerId={answerItem._id}
						answerType={answerType}
						answer={answerItem.answer}
						isCorrect={answerItem.isCorrect}
						key={answerItem._id}
					/>
				))}

				<div className='question-edit__button-line'>
					<Button
						content='Add answer'
						variant='success'
						classNames='margin-right'
						onClickCallback={addAnswerInState}
						onClickCallbackProps={[questionId]}
					/>

					<Button
						content='Delete question'
						variant='danger'
						onClickCallback={setAnimationState}
						onClickCallbackProps={[false]}
					/>
				</div>
			</div>
		</div>
	);
};

export default memo(QuestionEditView);
