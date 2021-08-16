import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import SkeletonAnswer from './SkeletonAnswerEditView';

const SkeletonQuestion = () => {
	return (
		<SkeletonTheme color='#434343' highlightColor='#4d4d4d'>
			<div className='question-edit-wrapper slide-animation-block'>
				<div className='question-edit'>
					<div className='question-edit__parameters-line'>
						<label className='question-edit__input input' style={{ padding: '0' }}>
							<Skeleton style={{ display: 'flex' }} duration={1} />
						</label>
						<div className='question-edit__selector input' style={{ padding: '0' }}>
							<Skeleton style={{ display: 'flex' }} duration={1} />
						</div>
					</div>

					<SkeletonAnswer />

					<div className='question-edit__button-line'>
						<button type='button' className='button-success button margin-right'>
							Add answer
						</button>

						<button type='button' className='button-danger button'>
							Delete question
						</button>
					</div>
				</div>
			</div>
		</SkeletonTheme>
	);
};

export default SkeletonQuestion;
