import { useCallback } from 'react';
import { useGetForm, useSmartInput } from 'hooks';

import { updateFormName } from 'redux/actions/formActions';

import { addQuestion } from 'redux/actions/questionActions';

import './FormEditView.scss';

import { Input, Button } from 'components';

import { SkeletonFormEditView as SkeletonForm, QuestionEditView as Question } from 'modules';

const FormEditView = ({ viewType, ...props }) => {
	const [loading, formId, formName, questions, dispatch] = useGetForm(props.match.params.id, viewType);

	const addQuestionInState = useCallback(() => {
		dispatch(addQuestion(formId));
	}, [formId]);

	const [localText, updateLocalText] = useSmartInput(formName, updateFormName);

	if (loading) return <SkeletonForm />;

	if (!questions) return null;

	return (
		<div className='container form-edit'>
			<Input
				text={localText}
				inputType='text'
				placeholder='Enter something...'
				inputBlock='form-edit'
				onChangeCallback={updateLocalText}
				onChangeCallbackProps={[{ formId }]}
			/>

			{questions.map((questionItem) => (
				<Question
					formId={formId}
					animation={questionItem.animation}
					questionId={questionItem._id}
					question={questionItem.question}
					answerType={questionItem.answerType}
					answers={questionItem.answers}
					animationIds={{ questionId: questionItem._id }}
					key={questionItem._uuid}
				/>
			))}

			<Button
				content='Add question'
				variant='primary'
				classNames='margin-left margin-bottom'
				onClickCallback={addQuestionInState}
			/>
		</div>
	);
};

export default FormEditView;
