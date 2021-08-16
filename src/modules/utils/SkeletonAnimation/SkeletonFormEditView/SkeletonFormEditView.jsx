import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import SkeletonQuestion from './SkeletonQuestionEditView';

const SkeletonForm = () => {
	return (
		<SkeletonTheme color='#434343' highlightColor='#4d4d4d'>
			<div className='form-edit container'>
				<label className='form-edit__input input'>
					<Skeleton height={'100%'} width={'100%'} style={{ display: 'flex' }} duration={1} />
				</label>

				<SkeletonQuestion />

				<button type='button' className='button-primary button margin-left margin-bottom'>
					Add question
				</button>
			</div>
		</SkeletonTheme>
	);
};

export default SkeletonForm;
