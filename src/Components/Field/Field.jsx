import { useState } from 'react';

import { v1 as uuid } from 'uuid';

import './Field.scss';

import Option from './Option';

export default function Field({ fieldIndex: index, name, answerType, setFields }) {
	const [options, setOptions] = useState([{ id: uuid(), text: '', correctness: false }]);

	const changeAnswerType = (event) => {
		setFields((prevState) => prevState.map((item, ind) => (index === ind ? { ...item, answerType: event.target.value } : item)));

		setOptions((prevList) => prevList.map((item) => ({ ...item, correctness: false })));
	};

	const updateFieldName = (event) => {
		setFields((prevState) => prevState.map((item, ind) => (index === ind ? { ...item, name: event.target.value } : item)));
	};

	const addOption = () => {
		setOptions((prevList) => [...prevList, { id: uuid(), text: '', correctness: false }]);
	};

	return (
		<div className='field'>
			<div className='name-select-line'>
				<input className='field-name' placeholder='Name of field...' value={name} onChange={updateFieldName} />

				<select className='answer-type-selector' size='large' defaultValue='Choose...' onChange={changeAnswerType}>
					<option value='checkbox'>Checkbox</option>
					<option value='radio'>Radiobutton</option>
				</select>
			</div>

			{options.map((item, ind) => (
				<Option key={item.id} answerType={answerType} optionIndex={ind} correctness={item.correctness} setOptions={setOptions} />
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
