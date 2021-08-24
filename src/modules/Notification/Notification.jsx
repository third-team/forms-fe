import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { CSSTransition } from 'react-transition-group';

import classnames from 'classnames';

import { deleteNotification } from 'redux/actions/notificationsListActions';

import './Notification.scss';

import deleteIcon from 'assets/icons/icon-delete.svg';

import { Button } from 'components';

const Notification = ({ _id, title, text, variant, delay }) => {
	const [animationState, setAnimationState] = useState(true);

	const timeout = useRef(null);
	const animationRef = useRef(null);

	const dispatch = useDispatch();

	const deleteNotificationCallback = () => {
		clearTimeout(timeout);

		dispatch(deleteNotification(_id));
	};

	const onExitedCallback = useCallback(() => {
		deleteNotificationCallback();
	}, [_id]);

	useEffect(() => {
		timeout.current = setTimeout(() => {
			setAnimationState(false);
		}, delay);

		return () => {
			clearTimeout(timeout);
		};
	}, []);

	return (
		<CSSTransition
			nodeRef={animationRef}
			in={animationState}
			timeout={500}
			appear
			classNames='notification'
			onExited={onExitedCallback}
		>
			<div ref={animationRef} className={classnames('notification', `notification-${variant}`)}>
				<div className='notification__title'>{title}</div>
				<div className='notification__text'>{text}</div>
				<Button
					content={<img src={deleteIcon} alt='delete notification' />}
					variant={variant}
					classNames='notification__button'
					onClickCallback={setAnimationState}
					onClickCallbackProps={[false]}
				/>
			</div>
		</CSSTransition>
	);
};

export default Notification;
