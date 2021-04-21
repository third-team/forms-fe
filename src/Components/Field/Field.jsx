import { useState } from 'react';

import { v1 as uuid } from 'uuid';

import './Field.scss';

import Option from './Option';

export default function Field() {
	const [options, setOptions] = useState([{ id: uuid(), text: '', correctness: false }]);
	const [answerType, setAnswerType] = useState('checkbox');

	const changeAnswerType = (event) => {
		setAnswerType(event.target.value);

		setOptions((prevList) => prevList.map((item) => ({ ...item, correctness: false })));
	};

	const addOption = () => {
		setOptions((prevList) => [...prevList, { id: uuid(), text: '', correctness: false }]);
	};

	return (
		<div className='field'>
			<div className='name-select-line'>
				<input className='field-name' placeholder='Name of field...' />

				<select className='answer-type-selector' size='large' defaultValue='Choose...' onChange={changeAnswerType}>
					<option value='checkbox'>Checkbox</option>
					<option value='radio'>Radiobutton</option>
				</select>
			</div>

			{options.map((item, index) => (
				<Option key={item.id} answerType={answerType} index={index} correctness={item.correctness} setOptions={setOptions} />
			))}

			<div className='button-line'>
				<button type='button' className='button button-add-option' onClick={addOption}>
					Add option
				</button>
				<button type='button' className='button'>
					Delete field
				</button>
			</div>
		</div>
	);
}
