import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteFormThunkCreator } from 'redux/thunks/formsListThunks';

import FormsListItem from './FormsListItem';

const FormsListItemContainer = ({ formId, name, exitDone, setAnimationState, deleteFormInState, ...props }) => {
	const history = useHistory();

	useEffect(() => {
		if (exitDone) deleteFormInState(formId);
	}, [exitDone]);

	const editForm = () => {
		history.push({ pathname: `/editing/${formId}`, state: { creator: true } });
	};

	return <FormsListItem formId={formId} formName={name} editForm={editForm} setAnimationState={setAnimationState} {...props} />;
};

const mapDispatchToProps = (dispatch) => ({
	deleteFormInState: (formId) => {
		dispatch(deleteFormThunkCreator(formId));
	},
});

export default connect(null, mapDispatchToProps)(FormsListItemContainer);
