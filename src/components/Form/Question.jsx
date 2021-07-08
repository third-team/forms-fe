import { useState, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { connect } from 'react-redux';

import axios from 'axios';

import './Question.scss';

import Answer from './Answer';

import { changeAnswerTypeActionCreator, removeQuestionActionCreator, addAnswerActionCreator } from '../../redux/actionCreators';

import InputWrapper from '../utils/InputWrapper';

function Question({
	creator,
	formId,
	questionId,
	question,
	answers,
	answerType,
	changeAnswerTypeInState,
	removeQuestionInState,
	addAnswerInState,
}) {
	const [animationState, setAnimationState] = useState(true);
	const [questionMaxHeight, setQuestionMaxHeight] = useState(0);

	const questionRef = useRef(null);

	const updateQuestionMaxHeight = (appendage) => {
		if (questionRef.current) setQuestionMaxHeight((prevState) => prevState + appendage);
	};

	const changeAnswerType = (newAnswerType) => {
		axios
			.put(
				`/questions/${questionId}`,
				{ formId, answerType: newAnswerType },
				{ headers: { Authorization: `Bearer ${localStorage.token}` } },
			)
			.then((response) => {
				if (response.status === 200) {
					changeAnswerTypeInState(questionId, newAnswerType);
				}
			})
			.catch((error) => {
				console.log('Changing answerType error!');
				console.log(error);
				console.log(error.response);
			});
	};

	const addAnswer = () => {
		const requestBody = {
			answer: 'Answer',
			isCorrect: false,
			questionId,
			index: answers.length,
		};

		axios
			.post('/answers', requestBody, { headers: { Authorization: `Bearer ${localStorage.token}` } })
			.then((response) => {
				if (response.status === 201) {
					addAnswerInState(questionId, response.data.answerId);
				}
			})
			.catch((error) => {
				console.log('Posting answer error!');
				console.log(error);
				console.log(error.response);
			});
	};

	const removeQuestion = () => {
		axios
			.delete(`/questions/${questionId}`, { headers: { Authorization: `Bearer ${localStorage.token}` } })
			.then((response) => {
				if (response.status === 200) {
					removeQuestionInState(questionId);
				}
			})
			.catch((error) => {
				console.log('Deleting question error!');
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
			nodeRef={questionRef}
			in={animationState}
			timeout={500}
			appear
			onEnter={() => {
				setTimeout(() => {
					setQuestionMaxHeight(questionRef.current.scrollHeight);
				}, 0);
			}}
			onEntered={() => {
				setQuestionMaxHeight('max-content');
			}}
			onExit={() => {
				setQuestionMaxHeight(questionRef.current.scrollHeight);

				setTimeout(() => {
					setQuestionMaxHeight(0);
				}, 0);
			}}
			onExited={() => {
				removeQuestion();
			}}
		>
			{(questionTransitionState) => (
				<div
					ref={questionRef}
					className='question-wrapper'
					style={{
						...defaultStyle,
						maxHeight: Number.isInteger(questionMaxHeight) ? `${questionMaxHeight}px` : 'max-content',
					}}
				>
					<div className='question'>
						<div className='question__parameters-line'>
							{creator ? (
								<InputWrapper inputType='question' questionId={questionId} formId={formId} initialText={question} />
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
										changeAnswerType(event.target.value);
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
								questionTransitionState={questionTransitionState}
								updateQuestionMaxHeight={updateQuestionMaxHeight}
								key={answerItem._id}
							/>
						))}

						{creator ? (
							<div className='question__button-line'>
								<button type='button' className='button button-success margin-right' onClick={addAnswer}>
									Add answer
								</button>

								<button
									type='button'
									className='button button-danger'
									onClick={() => {
										setAnimationState(false);
									}}
								>
									Delete Question
								</button>
							</div>
						) : null}
					</div>
				</div>
			)}
		</Transition>
	);
}

const mapStateToProps = (state) => ({
	formId: state.form._id,
});

const mapDispatchToProps = (dispatch) => ({
	changeAnswerTypeInState: (questionId, answerType) => {
		dispatch(changeAnswerTypeActionCreator(questionId, answerType));
	},
	addAnswerInState: (questionId, answerId) => {
		dispatch(addAnswerActionCreator(questionId, answerId));
	},
	removeQuestionInState: (questionId) => {
		dispatch(removeQuestionActionCreator(questionId));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
