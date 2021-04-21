import './Option.scss';

export default function Option({ answerType }) {
	return (
		<div className='option'>
			<input type={answerType} className='option-control' />
			<input type='text' className='option-input' />
		</div>
	);
}
