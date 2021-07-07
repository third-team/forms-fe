import { useState, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { connect } from 'react-redux';

import axios from 'axios';

import './Answer.scss';

import { removeAnswerActionCreator, updateIsCorrectActionCreator } from '../../redux/actionCreators';

import deleteIcon from '../../assets/icons/icon-delete.svg';

import InputWrapper from '../utils/InputWrapper';

function Answer({
	creator,
	questionId,
	answerId,
	answerType,
	answer,
	isCorrect,
	questionTransitionState,
	updateQuestionMaxHeight,
	removeAnswerInState,
	updateIsCorrectInState,
}) {
	const [animationState, setAnimationState] = useState(true);
	const [answerMaxHeight, setAnswerMaxHeight] = useState(0);

	const answerRef = useRef(null);

	const updateIsCorrect = (checked) => {
		axios
			.put(`/answers/${answerId}`, { questionId, isCorrect: checked }, { headers: { Authorization: `Bearer ${localStorage.token}` } })
			.then((response) => {
				if (response.status === 200) {
					updateIsCorrectInState(questionId, answerId, answerType, checked);
				}
			})
			.catch((error) => {
				console.log('Updating isCorrect error!');
				console.log(error);
				console.log(error.response);
			});
	};

	const removeAnswer = () => {
		axios
			.delete(`/answers/${answerId}`, { headers: { Authorization: `Bearer ${localStorage.token}` } })
			.then((response) => {
				if (response.status === 200) {
					removeAnswerInState(questionId, answerId);
				}
			})
			.catch((error) => {
				console.log('Deleting answer error!');
				console.log(error);
				console.log(error.response);
			});
	};

	const defaultStyle = {
		maxHeight: '0px',
		overflow: 'hidden',

		transition: '0.5s ease',
	};

	return (
		<Transition
			nodeRef={answerRef}
			in={animationState}
			timeout={500}
			appear
			onEnter={() => {
				setTimeout(() => {
					setAnswerMaxHeight(answerRef.current.scrollHeight);
				}, 0);
			}}
			onEntering={() => {
				setTimeout(() => {
					if (questionTransitionState === 'entering') updateQuestionMaxHeight(answerRef.current.scrollHeight);
				}, 0);
			}}
			onExit={() => {
				setAnswerMaxHeight(0);
			}}
			onExited={() => {
				removeAnswer();
			}}
		>
			{() => (
				<div
					ref={answerRef}
					className='answer-wrapper'
					style={{
						...defaultStyle,
						maxHeight: answerMaxHeight,
					}}
				>
					<div className='answer'>
						<div className='answer__input-control-wrapper'>
							<div className='answer__input-control'>
								<input
									type={answerType}
									checked={isCorrect}
									onChange={(event) => {
										updateIsCorrect(event.target.checked);
									}}
								/>
							</div>
						</div>

						{creator ? (
							<InputWrapper inputType='answer' questionId={questionId} answerId={answerId} initialText={answer} />
						) : (
							<div className='input-container'>
								<label className='input'>{answer}</label>
							</div>
						)}

						{creator ? (
							<div className='answer__delete-container'>
								<button
									type='button'
									onClick={() => {
										setAnimationState(false);
									}}
									className='button button-danger'
								>
									<img src={deleteIcon} alt='delete answer' />
								</button>
							</div>
						) : null}
					</div>
				</div>
			)}
		</Transition>
	);
}

const mapDispatchToProps = (dispatch) => ({
	updateIsCorrectInState: (questionId, answerId, answerType, checked) => {
		dispatch(updateIsCorrectActionCreator(questionId, answerId, answerType, checked));
	},
	removeAnswerInState: (questionId, answerId) => {
		dispatch(removeAnswerActionCreator(questionId, answerId));
	},
});

export default connect(null, mapDispatchToProps)(Answer);
