import './Body.scss';

import Field from '../Field/Field';

export default function Body() {
	return (
		<div className='body'>
			<Field />

			<input type='button' value='Add field' className='button' />
		</div>
	);
}
