import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonAnswer = () => {
	return (
		<SkeletonTheme color='#434343' highlightColor='#4d4d4d'>
			<div className='answer-edit-wrapper'>
				<div className='answer-edit'>
					<div className='answer-edit__input-control-wrapper'>
						<Skeleton height={'1.3rem'} width={'1.3rem'} style={{ display: 'flex' }} duration={1} />
					</div>
					<label className='answer-edit__input input'>
						<Skeleton height={'100%'} width={'100%'} style={{ display: 'flex' }} duration={1} />
					</label>

					<div className='answer-edit__delete-container'>
						<button type='button' className='button-danger button'>
							<div style={{ height: '100%', width: '100%' }}>
								<Skeleton height={'100%'} width={'100%'} style={{ display: 'flex' }} duration={1} />
							</div>
						</button>
					</div>
				</div>
			</div>
		</SkeletonTheme>
	);
};

export default SkeletonAnswer;
