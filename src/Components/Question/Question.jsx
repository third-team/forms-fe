import { connect } from 'react-redux';

import Answer from './Answer';

import {
	updateQuestionTextActionCreator,
	changeAnswerTypeActionCreator,
	removeQuestionActionCreator,
	addAnswerActionCreator,
} from '../../redux/actionCreators';

function Question({ questionIndex, question, answers, updateQuestionText, changeAnswerType, removeQuestion, addAnswer }) {
	return (
		<div className='question'>
			<div className='parameters-line'>
				<input
					placeholder='Name of question...'
					value={question}
					onChange={(event) => {
						event.preventDefault();
						updateQuestionText(questionIndex, event.target.value);
					}}
				/>

				<select
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
	const questionItem = state.questions.questions[props.questionIndex];

	return {
		questionIndex: props.questionIndex,
		question: questionItem.question,
		answers: questionItem.answers,
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
