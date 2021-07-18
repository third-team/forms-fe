import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { signInThunkCreator } from 'redux/thunks/userThunks';

import Auth from './Auth';

const AuthContainer = ({ signIn, ...props }) => {
	const history = useHistory();
	const [authType, setAuthType] = useState('login');

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

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

	const redirectToPageCallback = () => {
		history.push(props.location && props.location.state ? props.location.state.from : '/');
	};

	const handleSubmitClick = () => {
		if (authType === 'register' && password !== passwordConfirmation) {
			console.log('Passwords fields are not equal!');
		}

		signIn(authType, email, password, redirectToPageCallback);
	};

	return (
		<Auth
			authType={authType}
			updateAuthType={updateAuthType}
			email={email}
			password={password}
			passwordConfirmation={passwordConfirmation}
			setEmailCallback={setEmailCallback}
			setPasswordCallback={setPasswordCallback}
			setPasswordConfirmationCallback={setPasswordConfirmationCallback}
			handleSubmitClick={handleSubmitClick}
		/>
	);
};

const mapDispatchToProps = (dispatch) => ({
	signIn: (authType, email, password, history, location) => {
		dispatch(signInThunkCreator(authType, email, password, history, location));
	},
});

export default connect(null, mapDispatchToProps)(AuthContainer);
