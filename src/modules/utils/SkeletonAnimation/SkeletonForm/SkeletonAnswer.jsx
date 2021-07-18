import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonAnswer = () => {
	return (
		<SkeletonTheme color='#434343' highlightColor='#4d4d4d'>
			<div className='answer-wrapper'>
				<div className='answer'>
					<div className='answer__input-control-wrapper'>
						<Skeleton height={'1.3rem'} width={'1.3rem'} style={{ display: 'flex' }} duration={1} />
					</div>
					<div className='answer__input input' style={{ padding: '0px' }}>
						<Skeleton height={'100%'} width={'100%'} style={{ display: 'flex' }} duration={1} />
					</div>

					<div className='answer__delete-container'>
						<button type='button' className='button-danger button' style={{ padding: '0px' }}>
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
