import { useSelector } from 'react-redux';

import './NotificationWrapper.scss';

import { Notification } from 'modules';

import * as notificationsListSelector from 'redux/selectors/notificationsList';

const NotificationWrapper = () => {
	const notificationsList = useSelector(notificationsListSelector.notificationsList);

	if (notificationsList.length === 0) return null;

	return (
		<div className='notifications-wrapper'>
			{notificationsList.map((notification) => {
				return <Notification {...notification} key={notification._id} />;
			})}
		</div>
	);
};

export default NotificationWrapper;
