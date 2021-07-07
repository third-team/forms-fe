import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

import './Auth.scss';

import { AppContext } from '../../AppContext';

export default function Auth(props) {
	const history = useHistory();
	const { setLoggedIn } = useContext(AppContext);

	const [authType, setAuthType] = useState('login');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordChecking, setPasswordChecking] = useState('');

	const updateAuthType = () => {
		setAuthType(authType === 'login' ? 'register' : 'login');
	};

	const handleSubmit = () => {
		if (authType === 'register' && password !== passwordChecking) {
			console.log('Passwords fields are not equal!');
			return;
		}

		axios
			.post(`/${authType}`, { email, password })
			.then((response) => {
				if (response.status === 200) {
					axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;

					localStorage.token = response.data.token;

					setLoggedIn(true);

					history.push(props.location && props.location.state ? props.location.state.from : '/');
				}
			})
			.catch((error) => {
				console.log(error.response.data.message);
			});
	};

	return (
		<div className='container auth-form-wrapper'>
			<form className='auth-form'>
				<label htmlFor='email'>
					Email
					<input
						type='email'
						placeholder='yourEmail@.com'
						name='email'
						className='input auth-form__input'
						id='email'
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					/>
				</label>

				<label htmlFor='password'>
					Password:
					<input
						type='password'
						placeholder='Your password...'
						name='password'
						className='input auth-form__input'
						id='password'
						onChange={(event) => {
							setPassword(event.target.value);
						}}
					/>
				</label>

				{authType === 'register' && (
					<label htmlFor='passwordChecking'>
						Repeat password:
						<input
							type='password'
							placeholder='Your password...'
							name='passwordChecking'
							className='input auth-form__input'
							id='passwordChecking'
							onChange={(event) => {
								setPasswordChecking(event.target.value);
							}}
						/>
					</label>
				)}
				<button type='button' className='button button-success' onClick={handleSubmit}>
					Submit
				</button>
			</form>

			<button type='button' className='button button-primary' onClick={updateAuthType}>
				{authType === 'login' ? 'Register' : 'Login'}
			</button>
		</div>
	);
}