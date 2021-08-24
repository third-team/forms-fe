import { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deleteFormStarted } from 'redux/actions/formsListActions';

import './FormsListItem.scss';

import { Button } from 'components';

const FormsListItem = ({ formId, formName, targetRef, maxHeight }) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const deleteFormInState = useCallback(() => {
		dispatch(deleteFormStarted(formId));
	}, [formId]);

	const editForm = () => {
		history.push({ pathname: `/edit/${formId}` });
	};

	return (
		<div
			ref={targetRef}
			className='form-preview-wrapper slide-animation-block'
			style={{
				maxHeight: Number.isInteger(maxHeight) ? `${maxHeight}px` : maxHeight,
			}}
		>
			<div className='form-preview'>
				<h1>{formName}</h1>
				<div className='form-preview__buttons-wrapper'>
					<Button content='Edit' variant='success' onClickCallback={editForm} />

					<Button content='Delete' variant='danger' classNames='margin-left' onClickCallback={deleteFormInState} />
				</div>
			</div>
		</div>
	);
};

export default memo(FormsListItem);
