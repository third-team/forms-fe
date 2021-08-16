import { useCallback } from 'react';
import { useFormInitialization, useSmartInput } from 'hooks';

import { updateFormTextThunkCreator } from 'redux/thunks/formThunks';

import { addQuestionThunkCreator } from 'redux/thunks/questionThunks';

import './FormEditView.scss';

import { Input, Button } from 'components';

import { SkeletonFormEditView as SkeletonForm, QuestionEditView as Question } from 'modules';

const FormEditView = ({ viewType, ...props }) => {
	const [loading, formId, formName, questions, dispatch] = useFormInitialization(props.match.params.id, viewType);

	const updateFormTextInState = useCallback((name, objectsIds, undoTextUpdate) => {
		dispatch(updateFormTextThunkCreator(name, objectsIds, undoTextUpdate));
	}, []);

	const addQuestionInState = useCallback(() => {
		dispatch(addQuestionThunkCreator(formId));
	}, [formId]);

	const [localText, updateLocalText] = useSmartInput(formName, updateFormTextInState);

	if (loading) {
		return <SkeletonForm />;
	}

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
					questionId={questionItem._id}
					question={questionItem.question}
					answerType={questionItem.answerType}
					answers={questionItem.answers}
					key={questionItem._id}
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
