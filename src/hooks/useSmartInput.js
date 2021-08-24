import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';

const useSmartInput = (initialText, updateTextInState) => {
	const [localText, setLocalText] = useState(initialText);

	const dispatch = useDispatch();

	useEffect(() => {
		setLocalText(initialText);
	}, [initialText]);

	const timeout = useRef(null);

	const undoTextUpdate = () => {
		setLocalText(initialText);
	};

	const updateLocalText = useCallback((event, objectsIds) => {
		clearTimeout(timeout.current);

		setLocalText(event.target.value);

		timeout.current = setTimeout(() => {
			dispatch(updateTextInState(event.target.value, objectsIds, undoTextUpdate));
		}, 2500);
	}, []);

	return [localText, updateLocalText];
};

export default useSmartInput;
