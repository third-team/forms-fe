import { useState, useEffect, useRef } from 'react';

import axios from 'axios';

import saveIcon from '../../assets/icons/icon-save.png';

function Input({ inputType, inputTypeId, initialText, updateTextInGlobalState, ...props }) {
	const [localText, setLocalText] = useState(initialText);

	const timer = useRef(null);
	const requestBody = useRef({});

	useEffect(() => {
		switch (inputType) {
			case 'answer':
				requestBody.current.questionId = props.questionId;
				requestBody.current.answerId = props.answerId;
				break;
			case 'question':
				requestBody.current.formId = props.formId;
				requestBody.current.questionId = props.questionId;
				break;
			case 'form':
				requestBody.current.formId = props.formId;
				break;
			default:
				console.log('Input type is not valid!');
				break;
		}

		return () => {
			clearTimeout(timer.current);
		};
	}, []);

	const saveAnswer = (text) => {
		clearTimeout(timer.current);

		if (inputType !== 'form') requestBody.current[inputType] = text;
		else requestBody.current.name = text;

		axios
			.put(`/${inputType}s/${inputTypeId}`, requestBody.current, { headers: { Authorization: `Bearer ${localStorage.token}` } })
			.then((response) => {
				if (response.status === 201) {
					console.log(`Succesful ${inputType}'s text changing!`);

					updateTextInGlobalState(inputType, text, props.questionId, props.answerId);
				}
			})
			.catch((error) => {
				console.log(error);
				console.log(error.response);
			});
	};

	const updateLocalText = (event) => {
		event.preventDefault();

		clearTimeout(timer.current);

		setLocalText(event.target.value);

		timer.current = setTimeout(() => {
			saveAnswer(event.target.value);
		}, 2500);
	};

	return (
		<div className={`input-wrapper ${inputType}__input-wrapper`}>
			<input
				type='text'
				placeholder='Enter something...'
				value={localText}
				className={`input ${inputType}__input`}
				onChange={updateLocalText}
			/>
			<div className={`image-wrapper ${inputType}__image-wrapper`}>
				<button
					type='button'
					className='button'
					onClick={() => {
						saveAnswer(localText);
					}}
				>
					<img src={saveIcon} alt={'save'} />
				</button>
			</div>
		</div>
	);
}

export default Input;
