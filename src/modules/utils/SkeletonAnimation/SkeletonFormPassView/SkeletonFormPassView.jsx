import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import SkeletonQuestion from './SkeletonQuestionPassView';

const SkeletonForm = () => {
	return (
		<SkeletonTheme color='#434343' highlightColor='#4d4d4d'>
			<div className='form-pass container'>
				<label className='form-pass__label input' style={{ padding: '0' }}>
					<Skeleton height={'100%'} width={'100%'} style={{ display: 'flex' }} duration={1} />
				</label>

				<SkeletonQuestion />

				<button type='button' className='button button-original margin-bottom'>
					Submit
				</button>
			</div>
		</SkeletonTheme>
	);
};

export default SkeletonForm;
