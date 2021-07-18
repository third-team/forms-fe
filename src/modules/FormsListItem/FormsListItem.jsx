import './FormsListItem.scss';

import { Button } from 'components';

const FormsListItem = ({ formName, editForm, targetRef, maxHeight, setAnimationState }) => (
	<div
		ref={targetRef}
		className='form-preview-wrapper slide-animation-block'
		style={{
			maxHeight: Number.isInteger(maxHeight) ? `${maxHeight}px` : maxHeight,
		}}
	>
		<div className='form-preview'>
			<h1>{formName}</h1>
			<div className='form-preview__buttons-wrapper'>
				<Button content='Edit' variant='success' onClickCallback={editForm} />

				<Button
					content='Delete'
					variant='danger'
					classNames='margin-left'
					onClickCallback={setAnimationState}
					onClickCallbackProps={[false]}
				/>
			</div>
		</div>
	</div>
);

export default FormsListItem;
