import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import './Form.scss';

import SkeletonForm from './SkeletonForm';
import Question from './Question';

import InputWrapper from '../utils/InputWrapper';

import {
	addQuestionActionCreator,
	updateFormTextActionCreator,
	cleanFormStateActionCreator,
	initializeFormStateActionCreator,
} from '../../redux/actionCreators';

function Form({ formName, questions, updateFormText, addQuestionInState, cleanFormState, initializeFormState, formId, ...props }) {
	const [loading, setLoading] = useState(true);
	const [creator, setCreator] = useState(null);

	useEffect(() => {
		if (props) {
			if (props.location) {
				if (props.location.state) {
					if (props.location.state.creator) setCreator(true);
				}
			}
		} else setCreator(false);

		axios
			.get(`/forms/${props.match.params.id}`, {})
			.then((response) => {
				if (response.status === 200) {
					initializeFormState(response.data.form);

					setTimeout(() => {
						setLoading(false);
					}, 0);
				}
			})
			.catch((error) => {
				console.log('Form`s getting error!');
				console.log(error);
				console.log(error.response);
			});

		// return () => {
		// 	cleanFormState();
		// };
	}, []);

	const addQuestion = () => {
		const requestBody = {
			formId,
			question: 'Question',
			answerType: 'checkbox',
			index: questions.length,
		};

		axios
			.post('/questions', requestBody, { headers: { Authorization: `Bearer ${localStorage.token}` } })
			.then((response) => {
				if (response.status === 201) {
					addQuestionInState(response.data.questionId);
				}
			})
			.catch((error) => {
				console.log('Posting question error!');
				console.log(error);
				console.log(error.response);
			});
	};

	// const submitForm = () => {
	// 	const formQuestions = questions.map(({ id: questionId, ...item }) => {
	// 		const answers = item.answers.map(({ id, ...answer }) => answer);

	// 		return { ...item, answers };
	// 	});

	// 	axios
	// 		.post('/forms', { name: formName, questions: formQuestions }, { headers: { Authorization: `Bearer ${localStorage.token}` } })
	// 		.then((response) => {
	// 			if (response.status === 201) {
	// 				console.log('Successful form`s getting!');
	// 			}
	// 		})
	// 		.catch(() => {
	// 			console.log('Form`s getting error!');
	// 		});
	// };

	if (loading) {
		return <SkeletonForm />;
	}

	if (questions.length) {
		return (
			<div className='container form'>
				{creator ? (
					<InputWrapper inputType='form' formId={formId} initialText={formName} />
				) : (
					<div className='input-wrapper form__input-wrapper'>
						<label className='input form__input'>{formName}</label>
					</div>
				)}

				{questions.map((questionItem) => (
					<Question
						creator={creator}
						questionId={questionItem._id}
						question={questionItem.question}
						answerType={questionItem.answerType}
						answers={questionItem.answers}
						key={questionItem._id}
					/>
				))}

				{creator ? (
					<button type='button' className='button button-primary margin-left margin-bottom' onClick={addQuestion}>
						Add question
					</button>
				) : null}

				{/* <button type='button' className='button button-original margin-bottom' onClick={submitForm}>
					Submit
				</button> */}
			</div>
		);
	}

	return null;
}

const mapStateToProps = (state) => ({
	formId: state.form._id,
	formName: state.form.name,
	questions: state.questions.questions,
});

const mapDispatchToProps = (dispatch) => ({
	initializeFormState: (form) => {
		dispatch(initializeFormStateActionCreator(form));
	},
	updateFormText: (name) => {
		dispatch(updateFormTextActionCreator(name));
	},
	addQuestionInState: (questionId) => {
		dispatch(addQuestionActionCreator(questionId));
	},
	cleanFormState: () => {
		dispatch(cleanFormStateActionCreator());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
