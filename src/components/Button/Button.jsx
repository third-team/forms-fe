import classnames from 'classnames';

import './Button.scss';

const Button = ({ content, variant, classNames = '', onClickCallback, onClickCallbackProps = [] }) => {
	const buttonVariant = variant ? `button-${variant}` : '';

	return (
		<button
			type='button'
			className={classnames('button', buttonVariant, classNames)}
			onClick={() => {
				onClickCallback(...onClickCallbackProps);
			}}
		>
			{content}
		</button>
	);
};

export default Button;
