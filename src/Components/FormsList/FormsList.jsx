import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';

import './FormsList.scss';

import SkeletonFormPreview from './SkeletonFormPreview';

import { setFormsListActionCreator, removeFormActionCreator } from '../../redux/actionCreators';

function FormsList({ formsList, setFormsList, removeForm }) {
	const history = useHistory();

	const [loading, setLoading] = useState(true);
	const [forms, setForms] = useState([]);

	useEffect(() => {
		axios
			.get('/forms/my', { headers: { Authorization: `Bearer ${localStorage.token}` } })
			.then((response) => {
				if (response.status === 200) {
					if (response.data) {
						setFormsList(response.data.forms);
						setForms(response.data.forms);
						setLoading(false);
					}
				}
			})
			.catch((error) => {
				console.log('Form`s getting error!');
				console.log(error);
				console.log(error.response);
			});
	}, []);

	const deleteForm = (item) => {
		axios
			.delete(`/forms/${item._id}`, { headers: { Authorization: `Bearer ${localStorage.token}` } })
			.then((response) => {
				if (response.status === 200) {
					removeForm(item._id);
				}
			})
			.catch((error) => {
				console.log('Deleting form error!');
				console.log(error);
				console.log(error.response);
			});
	};

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

	const editForm = (id) => {
		history.push({ pathname: `/editing/${id}`, state: { creator: true } });
	};

	return (
		<div className='container forms-list'>
			{loading ? (
				<SkeletonFormPreview />
			) : forms.length === 0 ? (
				<h1>You haven&apos;t created any forms yet... Do you want to create a new one?</h1>
			) : (
				formsList.map((item) => (
					<div className='forms-list__form-name' key={item._id}>
						<h1>{item.name}</h1>
						<div className='forms-list__buttons-wrapper'>
							<button
								type='button'
								className='button button-success'
								onClick={() => {
									editForm(item._id);
								}}
							>
								Edit
							</button>
							<button
								type='button'
								className='button button-danger margin-left'
								onClick={() => {
									deleteForm(item);
								}}
							>
								Delete
							</button>
						</div>
					</div>
				))
			)}

			<button type='button' className='button button-primary margin-bottom' onClick={createForm}>
				Create Form
			</button>
		</div>
	);
}

const mapStateToProps = (state) => ({ formsList: state.formsList });

const mapDispatchToProps = (dispatch) => ({
	setFormsList: (formList) => {
		dispatch(setFormsListActionCreator(formList));
	},
	removeForm: (id) => {
		dispatch(removeFormActionCreator(id));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(FormsList);
