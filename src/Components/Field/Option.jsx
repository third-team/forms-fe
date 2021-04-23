import './Option.scss';

export default function Option({ answerType, optionIndex: index, isCorrect, setOptions }) {
	const removeOption = () => {
		setOptions((prevList) => prevList.filter((_, ind) => ind !== index));
	};

	const updateTextField = (event) => {
		setOptions((prevList) =>
			prevList.map((item, ind) => {
				if (ind === index) {
					return { ...prevList[index], answer: event.target.value };
				}
				return item;
			}),
		);
	};

	const updateisCorrectField = (event) => {
		setOptions((prevList) =>
			prevList.map((item, ind) => {
				if (ind === index) {
					return { ...prevList[index], isCorrect: event.target.checked };
				}
				return answerType === 'checkbox' ? item : { ...item, isCorrect: false };
			}),
		);
	};

	return (
		<div className='option'>
			<input type={answerType} checked={isCorrect} className='option-control' onChange={updateisCorrectField} />
			<input type='text' placeholder='Enter something...' onChange={updateTextField} className='option-input' />
			<button type='button' onClick={removeOption} className='delete-button'>
				&#10006;
			</button>
		</div>
	);
}
