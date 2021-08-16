import classnames from 'classnames';

import './Input.scss';

const Input = ({
	text = '',
	inputType,
	placeHolder = '',
	inputBlock,
	classNames = '',
	onChangeCallback,
	onChangeCallbackProps = [],
}) => {
	return (
		<input
			type={`${inputType}`}
			placeholder={placeHolder}
			value={text}
			className={classnames('input', `${inputBlock}__input`, classNames)}
			onChange={(event) => {
				onChangeCallback(event, ...onChangeCallbackProps);
			}}
		/>
	);
};

export default Input;
