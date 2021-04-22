import { useState } from 'react';

import './Auth.scss';

export default function Auth({ setLoginState }) {
	const [authType, setAuthType] = useState('login');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordChecking, setPasswordChecking] = useState('');

	const updateAuthType = () => {
		setAuthType(authType === 'login' ? 'register' : 'login');
	};

	const handleSubmit = (event) => {
		console.log('kukesb');
	};

	return (
		<div className='auth-container'>
			<form method='post' className='auth-form'>
				<label htmlFor='email'>
					Email
					<input
						type='email'
						placeholder='yourEmail@.com'
						name='email'
						className='data-input'
						id='email'
						onChange={(event) => {
							setPassword(event.target.value);
						}}
					/>
				</label>

				<label htmlFor='password'>
					Password:
					<input
						type='password'
						placeholder='Your password...'
						name='password'
						className='data-input'
						id='password'
						onChange={(event) => {
							setPasswordChecking(event.target.value);
						}}
					/>
				</label>

				{authType === 'register' && (
					<label htmlFor='passwordChecking'>
						Repeat password:
						<input
							type='passwordChecking'
							placeholder='Your password...'
							name='passwordChecking'
							className='data-input'
							id='passwordChecking'
							onChange={(event) => {
								setEmail(event.target.value);
							}}
						/>
					</label>
				)}
				<button type='button' onClick={handleSubmit}>
					Submit
				</button>
			</form>

			<button type='button' onClick={updateAuthType}>
				{authType === 'login' ? 'Register' : 'Login'}
			</button>
		</div>
	);
}
