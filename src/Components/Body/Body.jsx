import { useState } from 'react';

import { v1 as uuid } from 'uuid';

import './Body.scss';

import Field from '../Field/Field';

export default function Body() {
	const [fields, setFields] = useState([{ id: uuid(), name: '', answerType: 'checkbox' }]);

	return (
		<div className='body'>
			{fields.map((item, ind) => (
				<Field fieldIndex={ind} name={item.name} answerType={item.answerType} setFields={setFields} key={item.id} />
			))}

			<input type='button' value='Add field' className='button' />
		</div>
	);
}
