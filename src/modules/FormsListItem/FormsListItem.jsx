import { useEffect, useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deleteFormThunkCreator } from 'redux/thunks/formsListThunks';

import './FormsListItem.scss';

import { Button } from 'components';

const FormsListItem = ({ formId, formName, targetRef, maxHeight, exitDone, setAnimationState }) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const deleteFormInState = useCallback(() => {
		dispatch(deleteFormThunkCreator(formId));
	}, [formId]);

	useEffect(() => {
		if (exitDone) deleteFormInState(formId);
	}, [exitDone]);

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

					<Button
						content='Delete'
						variant='danger'
						classNames='margin-left'
						onClickCallback={setAnimationState}
						onClickCallbackProps={[false]}
					/>
				</div>
			</div>
		</div>
	);
};

export default memo(FormsListItem);
