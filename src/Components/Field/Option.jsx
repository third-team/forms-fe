import './Option.scss';

export default function Option({ answerType, index, setOptions }) {
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

	return (
		<div className='option'>
			<input type={answerType} className='option-control' />
			<input type='text' placeholder='Enter something...' onChange={updateTextField} className='option-input' />
			<button type='button' onClick={removeOption} className='delete-button'>
				&#10006;
			</button>
		</div>
	);
}
