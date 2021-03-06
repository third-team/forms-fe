import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, isAuth, viewType, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			isAuth ? (
				<Component viewType={viewType} {...props} />
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
const mapStateToProps = (state) => ({ isAuth: state.user.isAuth });

export default connect(mapStateToProps, null)(ProtectedRoute);
