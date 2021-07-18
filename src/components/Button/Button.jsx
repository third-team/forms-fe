import './Button.scss';

const Button = ({ content, variant, classNames = '', onClickCallback, onClickCallbackProps = [] }) => {
	const buttonVariant = variant ? `button-${variant}` : '';

	return (
		<button
			type='button'
			className={`button ${buttonVariant} ${classNames}`}
			onClick={() => {
				onClickCallback(...onClickCallbackProps);
			}}
		>
			{content}
		</button>
	);
};

export default Button;
