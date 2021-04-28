import { useState } from 'react';

import { v1 as uuid } from 'uuid';

import axios from 'axios';

import './Form.scss';

import Question from '../Question/Question';

export default function Body() {
	const [questions, setQuestions] = useState([{ id: uuid(), name: '', answerType: 'checkbox', answers: [] }]);

	const addQuestion = () => {
		setQuestions((prevList) => [...prevList, { id: uuid(), name: '', answerType: 'checkbox', answers: [] }]);
	};

	const submitForm = () => {
		const formData = questions.map(({ id: questionsId, ...item }) => {
			const answers = item.answers.map(({ id, ...answer }) => answer);

			return { ...item, answers };
		});

		axios
			.post('https://third-team-forms.herokuapp.com/forms', formData)
			.then((response) => {
				if (response.status === 200) {
					console.log('Success!');
				}
			})
			.catch(() => {
				console.log('Something went wrong...');
			});
	};

	return (
		<div className='body'>
			{questions.map((item, ind) => (
				<Question questionIndex={ind} name={item.name} answerType={item.answerType} setQuestions={setQuestions} key={item.id} />
			))}

			<input type='button' value='Add question' className='button' onClick={addQuestion} />

			<input type='button' value='Submit' className='button submit-button' onClick={submitForm} />
		</div>
	);
}
