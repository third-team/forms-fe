import { useState, useEffect } from 'react';
import { Transition } from 'react-transition-group';

const defaultStyle = {
	maxHeight: '0px',
	transition: '0.5s',
};

const transitionStyles = {
	entering: {},
	entered: { maxHeight: 'initial' },
	exiting: { maxHeight: '0px' },
	exited: { maxHeight: '0px' },
};

function AnimateWrapper({ component: Component, animationState, removeElement, ...rest }) {
	// const [animationState, setAnimationState] = useState(true);
	const [removeElementCallback, setRemoveElementCallback] = useState(null);
	const [maxHeight, setMaxHeight] = useState('0px');

	useEffect(() => {
		setMaxHeight(document.documentElement.clientHeight);
	});

	return (
		<Transition
			in={animationState}
			timeout={500}
			appear
			onExited={(callback) => {
				removeElement();
			}}
		>
			{(state) => <Component {...rest} style={{ ...defaultStyle, maxHeight: `${maxHeight}px`, ...transitionStyles[state] }} />}
		</Transition>
	);
}

export default AnimateWrapper;
