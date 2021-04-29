import { connect } from 'react-redux';

import './Question.scss';

import Answer from './Answer';

import {
	updateQuestionTextActionCreator,
	changeAnswerTypeActionCreator,
	removeQuestionActionCreator,
	addAnswerActionCreator,
} from '../../redux/actionCreators';

function Question({ questionIndex, name, answers, updateQuestionText, changeAnswerType, removeQuestion, addAnswer }) {
	return (
		<div className='question'>
			<div className='name-select-line'>
				<input
					className='question-name'
					placeholder='Name of question...'
					value={name}
					onChange={(event) => {
						event.preventDefault();
						updateQuestionText(questionIndex, event.target.value);
					}}
				/>

				<select
					className='answer-type-selector'
					size='large'
					defaultValue='Choose...'
					onChange={(event) => {
						changeAnswerType(questionIndex, event.target.value);
					}}
				>
					<option value='checkbox'>Checkbox</option>
					<option value='radio'>Radiobutton</option>
				</select>
			</div>

			{answers.map((answer, answerIndex) => (
				<Answer questionIndex={questionIndex} answerIndex={answerIndex} key={answer.id} />
			))}

			<div className='button-line'>
				<button
					type='button'
					className='button button-add-answer'
					onClick={() => {
						addAnswer(questionIndex);
					}}
				>
					Add answer
				</button>

				<button
					type='button'
					className='button'
					onClick={() => {
						removeQuestion(questionIndex);
					}}
				>
					Delete Question
				</button>
			</div>
		</div>
	);
}

const mapStateToProps = (state, props) => {
	const question = state.questions.questions[props.questionIndex];

	return {
		questionIndex: props.questionIndex,
		name: question.name,
		answers: question.answers,
	};
};

const mapDispatchToProps = (dispatch) => ({
	updateQuestionText: (questionIndex, text) => {
		dispatch(updateQuestionTextActionCreator(questionIndex, text));
	},
	changeAnswerType: (questionIndex, answerType) => {
		dispatch(changeAnswerTypeActionCreator(questionIndex, answerType));
	},
	removeQuestion: (questionIndex) => {
		dispatch(removeQuestionActionCreator(questionIndex));
	},
	addAnswer: (questionIndex) => {
		dispatch(addAnswerActionCreator(questionIndex));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
