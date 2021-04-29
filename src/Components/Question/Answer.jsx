import { connect } from 'react-redux';

import { removeAnswerActionCreator, updateAnswerTextActionCreator, updateIsCorrectActionCreator } from '../../redux/actionCreators';

import './Answer.scss';

function Answer({ questionIndex, answerIndex, answerType, isCorrect, removeAnswer, updateAnswerText, updateIsCorrect }) {
	return (
		<div className='answer'>
			<input
				type={answerType}
				checked={isCorrect}
				className='answer-control'
				onChange={(event) => {
					updateIsCorrect(questionIndex, answerIndex, answerType, event.target.checked);
				}}
			/>
			<input
				type='text'
				placeholder='Enter something...'
				onChange={(event) => {
					event.preventDefault();
					updateAnswerText(questionIndex, answerIndex, event.target.value);
				}}
				className='answer-input'
			/>

			<button
				type='button'
				onClick={() => {
					removeAnswer(questionIndex, answerIndex);
				}}
				className='delete-button'
			>
				&#10006;
			</button>
		</div>
	);
}

const mapStateToProps = (state, props) => ({
	questionIndex: props.questionIndex,
	answerIndex: props.answerIndex,
	answerType: state.questions.questions[props.questionIndex].answerType,
	isCorrect: state.questions.questions[props.questionIndex].answers[props.answerIndex].isCorrect,
});

const mapDispatchToProps = (dispatch) => ({
	removeAnswer: (questionIndex, answerIndex) => {
		dispatch(removeAnswerActionCreator(questionIndex, answerIndex));
	},
	updateAnswerText: (questionIndex, answerIndex, text) => {
		dispatch(updateAnswerTextActionCreator(questionIndex, answerIndex, text));
	},
	updateIsCorrect: (questionIndex, answerIndex, answerType, checked) => {
		dispatch(updateIsCorrectActionCreator(questionIndex, answerIndex, answerType, checked));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
