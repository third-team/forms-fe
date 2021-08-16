import { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { initializeFormThunkCreator } from 'redux/thunks/formThunks';

import * as formSelector from 'redux/selectors/formSelectors';

const useFormInitialization = (formIdFormUrl, viewType) => {
	const [loading, setLoading] = useState(true);

	const formId = useSelector(formSelector.formId);
	const formName = useSelector(formSelector.formName);
	const questions = useSelector(formSelector.questions, shallowEqual);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeFormThunkCreator(formIdFormUrl, setLoading, viewType));
	}, []);

	return [loading, formId, formName, questions, dispatch];
};

export default useFormInitialization;
