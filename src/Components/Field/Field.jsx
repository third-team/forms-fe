import './Field.scss';

import Option from './Option';

export default function Field() {
	return (
		<div className='field'>
			<div className='name-select-line'>
				<input className='field-name' placeholder='Name of field...' />

				<select className='answer-type-selector' size='large' defaultValue='Choose...'>
					<option value='Checkbox'>Checkbox</option>
					<option value='Radiobutton'>Radiobutton</option>
				</select>
			</div>

			<Option answerType='checkbox' />
			<Option answerType='radio' />

			<div className='button-line'>
				<input type='button' value='Add option' className='button button-add-option' />
				<input type='button' value='Delete field' className='button' />
			</div>
		</div>
	);
}
