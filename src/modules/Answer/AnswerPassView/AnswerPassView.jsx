import { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';

import { updateIsCorrect } from 'redux/actions/answerActions';

import './AnswerPassView.scss';

const AnswerPassView = ({ questionId, answerId, answerType, answer, isCorrect, targetRef, maxHeight }) => {
	const dispatch = useDispatch();

	const updateIsCorrectInState = useCallback(
		(event) => {
			dispatch(updateIsCorrect(questionId, answerId, answerType, event.target.checked));
		},
		[questionId, answerId, answerType],
	);

	return (
		<div
			ref={targetRef}
			className='answer-pass-wrapper slide-animation-block'
			style={{
				maxHeight: Number.isInteger(maxHeight) ? `${maxHeight}px` : maxHeight,
			}}
		>
			<div className='answer-pass'>
				<div className='answer-pass__input-control-wrapper'>
					<div className='answer-pass__input-control'>
						<input
							type={answerType}
							checked={isCorrect}
							onChange={(event) => {
								updateIsCorrectInState(event.target.checked);
							}}
						/>
					</div>
				</div>

				<label className='input answer-pass__label'>{answer}</label>
			</div>
		</div>
	);
};

export default memo(AnswerPassView);
