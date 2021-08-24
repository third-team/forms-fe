import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SlideAnimation } from 'components';

import { deleteForm } from 'redux/actions/formsListActions';

import FormsListItem from './FormsListItem';

const FormsListItemSlideAnimationWrapper = ({ animationIds, ...props }) => {
	const dispatch = useDispatch();

	const deleteFormCallback = useCallback(() => {
		dispatch(deleteForm(animationIds));
	}, [animationIds]);

	return <SlideAnimation component={FormsListItem} onExitCallback={deleteFormCallback} {...props} />;
};

export default FormsListItemSlideAnimationWrapper;
