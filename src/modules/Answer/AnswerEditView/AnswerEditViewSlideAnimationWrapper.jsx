import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SlideAnimation } from 'components';

import { removeAnswer } from 'redux/actions/answerActions';

import AnswerEditView from './AnswerEditView';

const AnswerEditViewSlideAnimationWrapper = ({ animationIds, ...props }) => {
	const dispatch = useDispatch();

	const removeAnswerCallback = useCallback(() => {
		dispatch(removeAnswer(animationIds));
	}, [animationIds]);

	return <SlideAnimation component={AnswerEditView} onExitCallback={removeAnswerCallback} {...props} />;
};

export default AnswerEditViewSlideAnimationWrapper;
