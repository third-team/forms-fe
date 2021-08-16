import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonAnswer = () => {
	return (
		<SkeletonTheme color='#434343' highlightColor='#4d4d4d'>
			<div className='answer-pass-wrapper'>
				<div className='answer-pass'>
					<div className='answer-pass__input-control-wrapper'>
						<Skeleton height={'1.3rem'} width={'1.3rem'} style={{ display: 'flex' }} duration={1} />
					</div>
					<label className='answer-pass__label input'>
						<Skeleton height={'100%'} width={'100%'} style={{ display: 'flex' }} duration={1} />
					</label>
				</div>
			</div>
		</SkeletonTheme>
	);
};

export default SkeletonAnswer;
