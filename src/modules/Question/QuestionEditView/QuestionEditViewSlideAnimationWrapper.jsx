import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SlideAnimation } from 'components';

import { removeQuestion } from 'redux/actions/questionActions';

import QuestionEditView from './QuestionEditView';

const QuestionEditViewSlideAnimationWrapper = ({ animationIds, ...props }) => {
	const dispatch = useDispatch();

	const removeQuestionCallback = useCallback(() => {
		dispatch(removeQuestion(animationIds));
	}, [animationIds]);

	return <SlideAnimation component={QuestionEditView} onExitCallback={removeQuestionCallback} {...props} />;
};

export default QuestionEditViewSlideAnimationWrapper;
