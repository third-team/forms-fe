import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { initializeFormThunkCreator, updateFormTextThunkCreator, cleanFormStateThunkCreator } from 'redux/thunks/formThunks';

import { addQuestionThunkCreator } from 'redux/thunks/questionThunks';

import { SkeletonAnimationForm } from 'modules';

import Form from './Form';

const FormContainer = ({ formId, formName, initializeFormInState, addQuestionInState, cleanFormInState, ...props }) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		initializeFormInState(props.match.params.id, setLoading);

		// return () => {
		// 	cleanFormInState();
		// };
	}, []);

	const addQuestion = () => {
		addQuestionInState(formId);
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
		return <SkeletonAnimationForm />;
	}

	return <Form formId={formId} formName={formName} addQuestionInState={addQuestion} {...props} />;
};

const mapStateToProps = (state) => ({
	formId: state.form._id,
	formName: state.form.name,
	questions: state.form.questions,
});

const mapDispatchToProps = (dispatch) => ({
	initializeFormInState: (formId, setLoadingFlag) => {
		dispatch(initializeFormThunkCreator(formId, setLoadingFlag));
	},
	updateFormTextInState: (name, objectsIds, undoTextUpdate) => {
		dispatch(updateFormTextThunkCreator(name, objectsIds, undoTextUpdate));
	},
	addQuestionInState: (formId) => {
		dispatch(addQuestionThunkCreator(formId));
	},
	cleanFormInState: () => {
		dispatch(cleanFormStateThunkCreator());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
