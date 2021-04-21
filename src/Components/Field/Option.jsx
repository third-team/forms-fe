import './Option.scss';

export default function Option({ answerType, index, correctness, setOptions }) {
	const removeOption = () => {
		setOptions((prevList) => prevList.filter((_, ind) => ind !== index));
	};

	const updateTextField = (event) => {
		setOptions((prevList) =>
			prevList.map((item, ind) => {
				if (ind === index) {
					return { ...prevList[index], text: event.target.value };
				}
				return item;
			}),
		);
	};

	const updateCorrectnessField = (event) => {
		setOptions((prevList) =>
			prevList.map((item, ind) => {
				if (ind === index) {
					return { ...prevList[index], correctness: event.target.checked };
				}
				return answerType === 'checkbox' ? item : { ...item, correctness: false };
			}),
		);
	};

	return (
		<div className='option'>
			<input type={answerType} checked={correctness} className='option-control' onChange={updateCorrectnessField} />
			<input type='text' placeholder='Enter something...' onChange={updateTextField} className='option-input' />
			<button type='button' onClick={removeOption} className='delete-button'>
				&#10006;
			</button>
		</div>
	);
}
