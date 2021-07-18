import './Question.scss';

import { Button, SmartInput } from 'components';

import { Answer } from 'modules';

const Question = ({
	creator = true,
	formId,
	questionId,
	question,
	answers,
	answerType,
	updateQuestionTextInState,
	changeAnswerTypeInState,
	addAnswerInState,
	targetRef,
	maxHeight,
	setAnimationState,
}) => (
	<div
		ref={targetRef}
		className='question-wrapper slide-animation-block'
		style={{
			maxHeight: Number.isInteger(maxHeight) ? `${maxHeight}px` : 'max-content',
		}}
	>
		{/* // <InputWrapper inputType='question' questionId={questionId} formId={formId} initialText={question} /> */}

		<div className='question'>
			<div className='question__parameters-line'>
				{creator ? (
					<SmartInput
						initialText={question}
						inputType='text'
						placeholder='Enter something...'
						inputPurpose='question'
						objectsIds={{ formId, questionId }}
						updateTextInState={updateQuestionTextInState}
					/>
				) : (
					<div className='input-wrapper question__input-wrapper'>
						<label className='input question__input'>{question}</label>
					</div>
				)}

				{creator ? (
					<select
						value={answerType}
						size='large'
						className='input question__selector'
						onChange={(event) => {
							changeAnswerTypeInState(formId, questionId, event.target.value);
						}}
					>
						<option value='checkbox'>Checkbox</option>
						<option value='radio'>Radiobutton</option>
					</select>
				) : null}
			</div>
			{answers.map((answerItem) => (
				<Answer
					creator={creator}
					questionId={questionId}
					answerId={answerItem._id}
					answerType={answerType}
					answer={answerItem.answer}
					isCorrect={answerItem.isCorrect}
					key={answerItem._id}
				/>
			))}

			{creator ? (
				<div className='question__button-line'>
					<Button
						content='Add answer'
						variant='success'
						classNames='margin-right'
						onClickCallback={addAnswerInState}
						onClickCallbackProps={[questionId]}
					/>

					<Button content='Delete Question' variant='danger' onClickCallback={setAnimationState} onClickCallbackProps={[false]} />
				</div>
			) : null}
		</div>
	</div>
);
export default Question;
