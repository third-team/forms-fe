import { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { axios } from 'core';

import { Button } from 'components';

import { setFormsListThunkCreator } from 'redux/thunks/formsListThunks';

import * as formsListSelector from 'redux/selectors/formsListSelectors';

import { FormsListItem, SkeletonFormsList } from 'modules';

const FormsList = ({ history }) => {
	const [loading, setLoading] = useState(true);

	const formsList = useSelector(formsListSelector.formsList, shallowEqual);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setFormsListThunkCreator(setLoading));
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

	return (
		<div className='container forms-list'>
			{formsList.length === 0 ? (
				<h1>You haven&apos;t created any forms yet... Do you want to create a new one?</h1>
			) : (
				formsList.map((item) => <FormsListItem formId={item._id} formName={item.name} key={item._id} />)
			)}

			<Button content='Create Form' variant='primary' classNames='margin-bottom' onClickCallback={createForm} />
		</div>
	);
};

export default FormsList;
