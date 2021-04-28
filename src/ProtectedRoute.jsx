import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, isLogin, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isLogin) {
					return <Component {...rest} {...props} />;
				}
				return (
					<Redirect
						to={{
							pathname: '/auth',
							state: {
								from: props.location,
							},
						}}
					/>
				);
			}}
		/>
	);
}
