import './Input.scss';

const Input = ({
	text = '',
	inputType,
	placeHolder = '',
	inputPurpose,
	classNames = '',
	onChangeCallback,
	onChangeCallbackProps = [],
}) => (
	<input
		type={`${inputType}`}
		placeholder={placeHolder}
		value={text}
		className={`input ${inputPurpose}__input ${classNames}`}
		onChange={(event) => {
			onChangeCallback(event, ...onChangeCallbackProps);
		}}
	/>
);

export default Input;
