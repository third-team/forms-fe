import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { axios } from 'core';

import { Button } from 'components';

import { getFormsList } from 'redux/actions/formsListActions';

import * as formsListSelector from 'redux/selectors/formsListSelectors';

import { FormsListItem, SkeletonFormsList } from 'modules';

const FormsList = ({ history }) => {
	const loading = useSelector(formsListSelector.loading);
	const forms = useSelector(formsListSelector.forms, shallowEqual);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getFormsList());
	}, []);

	const createForm = () => {
		axios
			.post('/forms', {
				name: 'Form name',
				questions: [{ question: 'Question', answerType: 'checkbox', answers: [{ answer: 'Answer', isCorrect: false }] }],
			})
			.then((response) => {
				if (response.status === 201) {
					history.push({ pathname: `/edit/${response.data.formId}`, state: { creator: true } });
				}
			})
			.catch((error) => {
				console.log('Form creating error!');
				console.log(error);
				console.log(error.response);
			});
	};

	if (loading) return <SkeletonFormsList />;

	if (!forms) return null;

	return (
		<div className='container forms-list'>
			{forms.length === 0 ? (
				<h1>You haven&apos;t created any forms yet... Do you want to create a new one?</h1>
			) : (
				forms.map((form) => (
					<FormsListItem
						formId={form._id}
						animation={form.animation}
						formName={form.name}
						animationIds={{ formId: form._id }}
						key={form._id}
					/>
				))
			)}

			<Button content='Create Form' variant='primary' classNames='margin-bottom' onClickCallback={createForm} />
		</div>
	);
};

export default FormsList;
