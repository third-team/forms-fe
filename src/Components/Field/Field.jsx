import { useState } from 'react';

import './Field.scss';

import Option from './Option';

export default function Field() {
	const [optionIterator] = useState({ id: 0 });
	const [options, setOptions] = useState([{ text: '', id: 0, correctness: false }]);
	const [answerType, setAnswerType] = useState('checkbox');

	const changeAnswerType = (event) => {
		setAnswerType(event.target.value);
	};

	const addOption = () => {
		optionIterator.id += 1;
		setOptions((prevList) => [...prevList, { text: '', id: optionIterator.id }]);
	};

	return (
		<div className='field'>
			<div className='name-select-line'>
				<input className='field-name' placeholder='Name of field...' />

				<select className='answer-type-selector' size='large' defaultValue='Choose...' onChange={changeAnswerType}>
					<option value='Checkbox'>Checkbox</option>
					<option value='Radiobutton'>Radiobutton</option>
				</select>
			</div>

			{options.map((item, index) => (
				<Option key={item.id} answerType={answerType} index={index} setOptions={setOptions} />
			))}

			<div className='button-line'>
				<input type='button' value='Add option' className='button button-add-option' onClick={addOption} />
				<input type='button' value='Delete field' className='button' />
			</div>
		</div>
	);
}
