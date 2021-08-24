import { useCallback } from 'react';
import { useGetForm } from 'hooks';

import './FormPassView.scss';

import { Button } from 'components';

import { SkeletonFormPassView as SkeletonForm, QuestionPassView as Question } from 'modules';

const FormEditView = ({ viewType, ...props }) => {
	const [loading, formId, formName, questions] = useGetForm(props.match.params.id, viewType);

	const submitForm = useCallback(() => {
		// const formQuestions = questions.map(({ id: questionId, ...item }) => {
		// 	const answers = item.answers.map(({ id, ...answer }) => answer);

		// 	return { ...item, answers };
		// });

		// axios
		// 	.post('/forms', { name: formName, questions: formQuestions }, { headers: { Authorization: `Bearer ${localStorage.token}` } })
		// 	.then((response) => {
		// 		if (response.status === 201) {
		// 			console.log('Successful form`s getting!');
		// 		}
		// 	})
		// 	.catch(() => {
		// 		console.log('Form`s getting error!');
		// 	});

		console.log('submit click!');
	}, [questions]);

	if (loading) return <SkeletonForm />;

	if (!questions) return null;

	return (
		<div className='container form-pass'>
			<label className='input form-pass__label'>{formName}</label>

			{questions.map((questionItem) => (
				<Question
					formId={formId}
					animation={questionItem.animation}
					questionId={questionItem._id}
					question={questionItem.question}
					answerType={questionItem.answerType}
					answers={questionItem.answers}
					key={questionItem._uuid}
				/>
			))}

			<Button content='Submit' variant='original' classNames='margin-bottom' onClickCallback={submitForm} />
		</div>
	);
};

export default FormEditView;
