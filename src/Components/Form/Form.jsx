import { connect } from 'react-redux';

import axios from 'axios';

import Question from './Question';

import { addQuestionActionCreator } from '../../redux/actionCreators';

function Form({ questions, addQuestion }) {
	const submitForm = () => {
		const formData = questions.map(({ id: questionsId, ...item }) => {
			const answers = item.answers.map(({ id, ...answer }) => answer);

			return { ...item, answers };
		});

		axios
			.post('https://third-team-forms.herokuapp.com/forms', formData)
			.then((response) => {
				if (response.status === 200) {
					console.log('Success!');
				}
			})
			.catch(() => {
				console.log('Something went wrong...');
			});
	};

	return (
		<div className='form'>
			{questions.map((question, questionIndex) => (
				<Question questionIndex={questionIndex} key={question.id} />
			))}

			<input type='button' value='Add question' className='button' onClick={addQuestion} />

			<input type='button' value='Submit' className='button submit-button' onClick={submitForm} />
		</div>
	);
}

const mapStateToProps = (state) => ({
	questions: state.questions.questions,
});

const mapDispatchToProps = (dispatch) => ({
	addQuestion: () => {
		dispatch(addQuestionActionCreator());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
