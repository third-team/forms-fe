import { uuid } from 'core';

import { ADD_NOTIFICATION, DELETE_NOTIFICATION } from 'redux/constants/notificationsListConstants';

export const addNotification = (title, text, variant, delay = 15000) => ({
	type: ADD_NOTIFICATION,
	payload: {
		_id: uuid(),
		text,
		title,
		variant,
		delay,
	},
});

export const deleteNotification = (notificationId) => ({
	type: DELETE_NOTIFICATION,
	payload: { notificationId },
});
