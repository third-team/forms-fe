import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AppContext } from '../AppContext';

export default function ProtectedRoute({ component: Component, ...rest }) {
	const { loggedIn } = useContext(AppContext);

	return (
		<Route
			{...rest}
			render={(props) =>
				loggedIn ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/auth',
							state: {
								from: props.location.pathname,
							},
						}}
					/>
				)
			}
		/>
	);
}
