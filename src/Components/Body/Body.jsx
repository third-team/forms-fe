import { useState } from 'react';

import axios from 'axios';

import { v1 as uuid } from 'uuid';

import './Body.scss';

import Field from '../Field/Field';

export default function Body() {
	const [fields, setFields] = useState([{ id: uuid(), name: '', answerType: 'checkbox', options: [] }]);

	const addField = () => {
		setFields((prevList) => [...prevList, { id: uuid(), name: '', answerType: 'checkbox', options: [] }]);
	};

	const submitForm = () => {
		const formData = fields.map(({ id: fieldId, ...item }) => {
			const options = item.options.map(({ id, ...option }) => option);

			return { ...item, options };
		});

		axios
			.post('https://third-team-forms.herokuapp.com/forms', formData)
			.then((response) => {
				if (response.status === 200) {
					console.log('Success!');
				}
			})
			.catch((error) => {
				console.log('Something went wrong...');
			});
	};

	return (
		<div className='body'>
			{fields.map((item, ind) => (
				<Field fieldIndex={ind} name={item.name} answerType={item.answerType} setFields={setFields} key={item.id} />
			))}

			<input type='button' value='Add field' className='button' onClick={addField} />

			<input type='button' value='Submit' className='button submit-button' onClick={submitForm} />
		</div>
	);
}
