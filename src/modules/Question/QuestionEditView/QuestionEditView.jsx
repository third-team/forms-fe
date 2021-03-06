import { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useSmartInput } from 'hooks';

import { updateQuestionText, changeAnswerType, removeQuestionStarted } from 'redux/actions/questionActions';

import { addAnswer } from 'redux/actions/answerActions';

import './QuestionEditView.scss';

import { Button, Input } from 'components';

import { AnswerEditView as Answer } from 'modules';

const QuestionEditView = ({ formId, questionId, question, answerType, answers, targetRef, maxHeight }) => {
	const dispatch = useDispatch();

	const changeAnswerTypeInState = useCallback(
		(event) => {
			dispatch(changeAnswerType(formId, questionId, answerType, event.target.value));
		},
		[formId, questionId, answerType],
	);

	const removeQuestionInState = useCallback(() => {
		dispatch(removeQuestionStarted(questionId));
	}, [questionId]);

	const addAnswerInState = useCallback(() => {
		dispatch(addAnswer(questionId));
	}, [questionId]);

	const [localText, updateLocalText] = useSmartInput(question, updateQuestionText);

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
						animation={answerItem.animation}
						questionId={questionId}
						answerId={answerItem._id}
						answerType={answerType}
						answer={answerItem.answer}
						isCorrect={answerItem.isCorrect}
						animationIds={{ questionId, answerId: answerItem._id }}
						key={answerItem._uuid}
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

					<Button content='Delete question' variant='danger' onClickCallback={removeQuestionInState} />
				</div>
			</div>
		</div>
	);
};

export default memo(QuestionEditView);
