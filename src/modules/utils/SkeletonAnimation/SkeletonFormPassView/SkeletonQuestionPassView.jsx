import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import SkeletonAnswer from './SkeletonAnswerPassView';

const SkeletonQuestion = () => {
	return (
		<SkeletonTheme color='#434343' highlightColor='#4d4d4d'>
			<div className='question-pass-wrapper slide-animation-block'>
				<div className='question-pass'>
					<label className='question-pass__label input'>
						<Skeleton style={{ display: 'flex' }} duration={1} />
					</label>

					<SkeletonAnswer />
				</div>
			</div>
		</SkeletonTheme>
	);
};

export default SkeletonQuestion;
