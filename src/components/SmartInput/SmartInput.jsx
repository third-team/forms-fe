import { useState, useEffect, useRef } from 'react';

import { Input } from 'components';

const SmartInput = ({ initialText, objectsIds, updateTextInState, ...props }) => {
	const [localText, setLocalText] = useState(initialText);

	const timer = useRef(null);

	useEffect(
		() => () => {
			clearTimeout(timer.current);
		},
		[],
	);

	const undoTextUpdate = () => {
		setLocalText(initialText);
	};

	const updateLocalText = (event) => {
		event.preventDefault();

		clearTimeout(timer.current);

		setLocalText(event.target.value);

		timer.current = setTimeout(() => {
			updateTextInState(event.target.value, objectsIds, undoTextUpdate);
		}, 2500);
	};

	return <Input text={localText} onChangeCallback={updateLocalText} {...props} />;
};

export default SmartInput;
