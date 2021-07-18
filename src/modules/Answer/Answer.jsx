import './Answer.scss';

import deleteIcon from 'assets/icons/icon-delete.svg';

import { Button, SmartInput } from 'components';

const Answer = ({
	creator = true,
	questionId,
	answerId,
	answerType,
	answer,
	isCorrect,
	updateAnswerTextInState,
	updateIsCorrectInState,
	targetRef,
	maxHeight,
	setAnimationState,
}) => (
	<div
		ref={targetRef}
		className='answer-wrapper slide-animation-block'
		style={{
			maxHeight: Number.isInteger(maxHeight) ? `${maxHeight}px` : maxHeight,
		}}
	>
		<div className='answer'>
			<div className='answer__input-control-wrapper'>
				<div className='answer__input-control'>
					<input
						type={answerType}
						checked={isCorrect}
						onChange={(event) => {
							updateIsCorrectInState(event.target.checked);
						}}
					/>
				</div>
			</div>

			{creator ? (
				<SmartInput
					initialText={answer}
					inputType='text'
					placeholder='Enter something...'
					inputPurpose='answer'
					objectsIds={{ questionId, answerId }}
					updateTextInState={updateAnswerTextInState}
				/>
			) : (
				<div className='input-container'>
					<label className='input'>{answer}</label>
				</div>
			)}

			{creator ? (
				<div className='answer__delete-container'>
					<Button
						content={<img src={deleteIcon} alt='delete answer' />}
						variant='danger'
						onClickCallback={setAnimationState}
						onClickCallbackProps={[false]}
					/>
				</div>
			) : null}
		</div>
	</div>
);

export default Answer;
