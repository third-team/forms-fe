import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { getForm } from 'redux/actions/formActions';

import * as formSelector from 'redux/selectors/formSelectors';

const useFormInitialization = (formIdUrl, viewType) => {
	const loading = useSelector(formSelector.loading);
	const formId = useSelector(formSelector.formId);
	const formName = useSelector(formSelector.formName);
	const questions = useSelector(formSelector.questions, shallowEqual);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getForm(formIdUrl, viewType));
	}, []);

	return [loading, formId, formName, questions, dispatch];
};

export default useFormInitialization;
