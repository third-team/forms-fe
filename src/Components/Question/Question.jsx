import { useState, useEffect } from 'react';

import { v1 as uuid } from 'uuid';

import './Question.scss';

import Answer from './Answer';

export default function Question({ questionIndex: index, name, answerType, setQuestions }) {
	const [answers, setAnswers] = useState([{ id: uuid(), answer: '', isCorrect: false }]);

	const changeAnswerType = (event) => {
		setQuestions((prevState) => prevState.map((item, ind) => (index === ind ? { ...item, answerType: event.target.value } : item)));

		setAnswers((prevList) => prevList.map((item) => ({ ...item, isCorrect: false })));
	};

	const updateQuestionName = (event) => {
		setQuestions((prevState) => prevState.map((item, ind) => (index === ind ? { ...item, name: event.target.value } : item)));
	};

	const removeQuestion = () => {
		setQuestions((prevList) => prevList.filter((_, ind) => ind !== index));
	};

	const addAnswer = () => {
		setAnswers((prevList) => [...prevList, { id: uuid(), answer: '', isCorrect: false }]);
	};

	useEffect(() => {
		setQuestions((prevState) => (prevState ? prevState.map((item, ind) => (index === ind ? { ...item, answers } : item)) : prevState));
	}, [answers]);

	return (
		<div className='question'>
			<div className='name-select-line'>
				<input className='question-name' placeholder='Name of question...' value={name} onChange={updateQuestionName} />

				<select className='answer-type-selector' size='large' defaultValue='Choose...' onChange={changeAnswerType}>
					<option value='checkbox'>Checkbox</option>
					<option value='radio'>Radiobutton</option>
				</select>
			</div>

			{answers.map((item, ind) => (
				<Answer key={item.id} answerType={answerType} answerIndex={ind} isCorrect={item.isCorrect} setAnswers={setAnswers} />
			))}

			<div className='button-line'>
				<button type='button' className='button button-add-answer' onClick={addAnswer}>
					Add answer
				</button>
				<button type='button' className='button' onClick={removeQuestion}>
					Delete Question
				</button>
			</div>
		</div>
	);
}
