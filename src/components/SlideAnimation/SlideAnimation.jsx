import { useState, useLayoutEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import './SlideAnimation.scss';

const SlideAnimation = ({ component: Component, ...props }) => {
	const [animationState, setAnimationState] = useState(null);
	const [maxHeight, setMaxHeight] = useState('initial');

	const [exitDone, setExitDone] = useState(false);

	const scrollHeight = useRef(null);
	const targetRef = useRef(null);

	useLayoutEffect(() => {
		scrollHeight.current = targetRef.current.scrollHeight;

		setAnimationState(true);
	}, []);

	return (
		<CSSTransition
			nodeRef={targetRef}
			in={animationState}
			timeout={500}
			onEnter={() => {
				setMaxHeight(0);
				setExitDone(false);
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
				setExitDone(true);
			}}
		>
			<Component
				targetRef={targetRef}
				maxHeight={maxHeight}
				exitDone={exitDone}
				setAnimationState={setAnimationState}
				{...props}
			/>
		</CSSTransition>
	);
};

export default SlideAnimation;
