import './Form.scss';

import { Button, SmartInput } from 'components';

import { Question } from 'modules';

const Form = ({ creator = true, formId, formName, questions, updateFormTextInState, addQuestionInState }) => (
	<div className='container form'>
		{creator ? (
			<SmartInput
				initialText={formName}
				inputType='text'
				placeholder='Enter something...'
				inputPurpose='form'
				objectsIds={{ formId }}
				updateTextInState={updateFormTextInState}
			/>
		) : (
			<div className='input-wrapper form__input-wrapper'>
				<label className='input form__input'>{formName}</label>
			</div>
		)}

		{questions.map((questionItem) => (
			<Question
				creator={creator}
				questionId={questionItem._id}
				question={questionItem.question}
				answerType={questionItem.answerType}
				answers={questionItem.answers}
				key={questionItem._id}
			/>
		))}

		{creator ? (
			<Button
				content='Add question'
				variant='primary'
				classNames='margin-left margin-bottom'
				onClickCallback={addQuestionInState}
			/>
		) : null}

		{/* <Button content='Submit' variant='original' classNames='margin-bottom' onClickCallback={submitForm} /> */}
	</div>
);

export default Form;
