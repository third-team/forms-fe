import { memo } from 'react';

import './QuestionPassView.scss';

import { AnswerPassView as Answer } from 'modules';

const QuestionEditView = ({ formId, questionId, question, answerType, answers, targetRef, maxHeight }) => {
	return (
		<div
			ref={targetRef}
			className='question-pass-wrapper slide-animation-block'
			style={{
				maxHeight: Number.isInteger(maxHeight) ? `${maxHeight}px` : 'max-content',
			}}
		>
			<div className='question-pass'>
				<label className='input question-pass__label'>{question}</label>

				{answers.map((answerItem) => (
					<Answer
						formId={formId}
						animation={answerItem.animation}
						questionId={questionId}
						answerId={answerItem._id}
						answerType={answerType}
						answer={answerItem.answer}
						isCorrect={answerItem.isCorrect}
						animationId={answerItem._uuid}
						key={answerItem._uuid}
					/>
				))}
			</div>
		</div>
	);
};

export default memo(QuestionEditView);
