import './Answer.scss';

export default function Answer({ answerType, answerIndex: index, isCorrect, setAnswers }) {
	const removeAnswer = () => {
		setAnswers((prevList) => prevList.filter((_, ind) => ind !== index));
	};

	const updateTextField = (event) => {
		setAnswers((prevList) =>
			prevList.map((item, ind) => {
				if (ind === index) {
					return { ...prevList[index], answer: event.target.value };
				}
				return item;
			}),
		);
	};

	const updateIsCorrectField = (event) => {
		setAnswers((prevList) =>
			prevList.map((item, ind) => {
				if (ind === index) {
					return { ...prevList[index], isCorrect: event.target.checked };
				}
				return answerType === 'checkbox' ? item : { ...item, isCorrect: false };
			}),
		);
	};

	return (
		<div className='answer'>
			<input type={answerType} checked={isCorrect} className='answer-control' onChange={updateIsCorrectField} />
			<input type='text' placeholder='Enter something...' onChange={updateTextField} className='answer-input' />
			<button type='button' onClick={removeAnswer} className='delete-button'>
				&#10006;
			</button>
		</div>
	);
}
