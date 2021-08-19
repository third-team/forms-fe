import { uuid } from 'core';

import { ADD_NOTIFICATION, DELETE_NOTIFICATION } from 'redux/constants/notificationsListConstants';

export const addNotificationActionCreator = (title, text, variant, delay = 15000) => ({
	type: ADD_NOTIFICATION,
	_id: uuid(),
	text,
	title,
	variant,
	delay,
});

export const deleteNotificationActionCreator = (notificationId) => ({
	type: DELETE_NOTIFICATION,
	notificationId,
});
