import { ADD_NOTIFICATION, DELETE_NOTIFICATION } from 'redux/constants/notificationsListConstants';

const notificationsListReducer = (state = { notifications: [] }, action) => {
	switch (action.type) {
		case ADD_NOTIFICATION:
			return {
				...state,
				notifications: [{ ...action.payload }, ...state.notifications],
			};

		case DELETE_NOTIFICATION:
			return {
				...state,
				notifications: state.notifications.filter((notification) => {
					return notification._id !== action.payload.notificationId;
				}),
			};

		default:
			return state;
	}
};

export default notificationsListReducer;
