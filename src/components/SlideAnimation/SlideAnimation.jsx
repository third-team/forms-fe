import { useState, useLayoutEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';

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
		<Transition
			nodeRef={targetRef}
			in={animationState}
			timeout={500}
			onEnter={() => {
				setMaxHeight(0);
				setExitDone(false);
			}}
			onEntering={() => {
				setTimeout(() => {
					setMaxHeight(scrollHeight.current);
				}, 0);
			}}
			onEntered={() => {
				setMaxHeight('max-content');
			}}
			onExit={() => {
				setMaxHeight(targetRef.current.scrollHeight);
			}}
			onExiting={() => {
				setTimeout(() => {
					setMaxHeight(0);
				}, 0);
			}}
			onExited={() => {
				setExitDone(true);
			}}
		>
			{() => (
				<Component
					targetRef={targetRef}
					maxHeight={maxHeight}
					exitDone={exitDone}
					setAnimationState={setAnimationState}
					{...props}
				/>
			)}
		</Transition>
	);
};

export default SlideAnimation;
