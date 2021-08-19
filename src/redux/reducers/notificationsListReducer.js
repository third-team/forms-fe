import { ADD_NOTIFICATION, DELETE_NOTIFICATION } from 'redux/constants/notificationsListConstants';

const notificationsListReducer = (state = { notifications: [] }, action) => {
	switch (action.type) {
		case ADD_NOTIFICATION:
			return {
				...state,
				notifications: state.notifications.concat({
					_id: action._id,
					title: action.title,
					text: action.text,
					variant: action.variant,
					delay: action.delay,
				}),
			};
		case DELETE_NOTIFICATION:
			return {
				...state,
				notifications: state.notifications.filter((notification) => {
					return notification._id !== action.notificationId;
				}),
			};
		default:
			return state;
	}
};

export default notificationsListReducer;
