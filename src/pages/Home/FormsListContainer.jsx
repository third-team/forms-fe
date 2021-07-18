import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { axios } from 'core';

import { setFormsListThunkCreator } from 'redux/thunks/formsListThunks';

import { SkeletonAnimationFormsList } from 'modules';

import FormsList from './FormsList';

const FormsListContainer = ({ formsList, setFormsListInState, deleteFormInState }) => {
	const history = useHistory();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setFormsListInState(setLoading);
	}, []);

	const createForm = () => {
		axios
			.post('/forms', {
				name: 'Form name',
				questions: [{ question: 'Question', answerType: 'checkbox', answers: [{ answer: 'Answer', isCorrect: false }] }],
			})
			.then((response) => {
				if (response.status === 201) {
					history.push({ pathname: `/editing/${response.data.formId}`, state: { creator: true } });
				}
			})
			.catch((error) => {
				console.log('Form creating error!');
				console.log(error);
				console.log(error.response);
			});
	};

	if (loading) return <SkeletonAnimationFormsList />;

	return <FormsList formsList={formsList} createForm={createForm} deleteFormInState={deleteFormInState} />;
};

const mapStateToProps = (state) => ({ formsList: state.formsList });

const mapDispatchToProps = (dispatch) => ({
	setFormsListInState: (setLoadingFlag) => {
		dispatch(setFormsListThunkCreator(setLoadingFlag));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(FormsListContainer);
