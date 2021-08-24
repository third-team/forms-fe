import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { signIn } from 'redux/actions/userActions';

import './Auth.scss';

import { Button, Input } from 'components';

const Auth = ({ history, location }) => {
	const [authType, setAuthType] = useState('login');

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	const dispatch = useDispatch();

	const updateAuthType = () => {
		setAuthType(authType === 'login' ? 'register' : 'login');
	};

	const setEmailCallback = (event) => {
		setEmail(event.target.value);
	};

	const setPasswordCallback = (event) => {
		setPassword(event.target.value);
	};

	const setPasswordConfirmationCallback = (event) => {
		setPasswordConfirmation(event.target.value);
	};

	const redirectToPageCallback = useCallback(() => {
		history.push(location && location.state ? location.state.from : '/');
	}, [history]);

	const handleSubmitClick = () => {
		if (authType === 'register' && password !== passwordConfirmation) {
			console.log('Passwords fields are not equal!');
		}
		dispatch(signIn(authType, email, password, redirectToPageCallback));
	};

	return (
		<div className='container auth-wrapper'>
			<form className='auth'>
				<label htmlFor='email'>
					Email
					<Input
						text={email}
						inputType={'email'}
						placeholder={'yourEmail@.com'}
						inputBlock={'auth'}
						onChangeCallback={setEmailCallback}
					/>
				</label>

				<label htmlFor='password'>
					Password:
					<Input
						text={password}
						inputType={'password'}
						placeholder={'Your password...'}
						inputBlock={'auth'}
						onChangeCallback={setPasswordCallback}
					/>
				</label>

				{authType === 'register' && (
					<label htmlFor='passwordChecking'>
						Repeat password:
						<Input
							text={passwordConfirmation}
							inputType={'password'}
							placeholder={'Your password...'}
							inputBlock={'auth'}
							onChangeCallback={setPasswordConfirmationCallback}
						/>
					</label>
				)}
				<Button content='Submit' variant='success' onClickCallback={handleSubmitClick} />
			</form>

			<Button content={authType === 'login' ? 'Register' : 'Login'} variant='primary' onClickCallback={updateAuthType} />
		</div>
	);
};

export default Auth;
