import { useState, useLayoutEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import './SlideAnimation.scss';

const SlideAnimation = ({ component: Component, animation, onExitCallback, ...props }) => {
	const [maxHeight, setMaxHeight] = useState('initial');

	const scrollHeight = useRef(null);
	const targetRef = useRef(null);

	useLayoutEffect(() => {
		scrollHeight.current = targetRef.current.scrollHeight;
	}, []);

	return (
		<CSSTransition
			nodeRef={targetRef}
			in={animation}
			timeout={500}
			appear
			onEnter={() => {
				setMaxHeight(0);
			}}
			onEntering={() => {
				setMaxHeight(scrollHeight.current);
			}}
			onEntered={() => {
				setMaxHeight('max-content');
			}}
			onExit={() => {
				setMaxHeight(targetRef.current.scrollHeight);
			}}
			onExiting={() => {
				setMaxHeight(0);
			}}
			onExited={() => {
				if (onExitCallback) onExitCallback();
			}}
		>
			<Component targetRef={targetRef} maxHeight={maxHeight} {...props} />
		</CSSTransition>
	);
};

export default SlideAnimation;
