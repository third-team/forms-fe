import './Option.scss';

export default function Option({ answerType, index, setOptions }) {
	const removeOption = () => {
		setOptions((prevList) => prevList.filter((_, ind) => ind !== index));
	};

	return (
		<div className='option'>
			<input type={answerType} className='option-control' />
			<input type='text' className='option-input' />
			<input type='button' value='&#10006;' onClick={removeOption} className='delete-button' />
		</div>
	);
}
