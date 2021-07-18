import './Auth.scss';

import { Button, Input } from 'components';

const Auth = ({
	authType,
	updateAuthType,
	email,
	password,
	passwordConfirmation,
	setEmailCallback,
	setPasswordCallback,
	setPasswordConfirmationCallback,
	handleSubmitClick,
}) => (
	<div className='container auth-wrapper'>
		<form className='auth'>
			<label htmlFor='email'>
				Email
				<Input
					text={email}
					inputType={'email'}
					placeholder={'yourEmail@.com'}
					inputPurpose={'auth'}
					onChangeCallback={setEmailCallback}
				/>
			</label>

			<label htmlFor='password'>
				Password:
				<Input
					text={password}
					inputType={'password'}
					placeholder={'Your password...'}
					inputPurpose={'auth'}
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
						inputPurpose={'auth'}
						onChangeCallback={setPasswordConfirmationCallback}
					/>
				</label>
			)}
			<Button content='Submit' variant='success' onClickCallback={handleSubmitClick} />
		</form>

		<Button content={authType === 'login' ? 'Register' : 'Login'} variant='primary' onClickCallback={updateAuthType} />
	</div>
);

export default Auth;
