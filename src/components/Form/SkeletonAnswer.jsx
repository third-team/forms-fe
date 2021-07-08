import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function SkeletonAnswer() {
	return (
		<SkeletonTheme color='#434343' highlightColor='#4d4d4d'>
			<div className='answer-wrapper'>
				<div className='answer'>
					<div className='answer__input-control-wrapper'>
						<div className='answer__input-control' style={{ backgroundColor: 'red' }}>
							<Skeleton height={'100%'} width={'100%'} style={{ display: 'flex' }} duration={1} />
						</div>
					</div>
					<div className='input-wrapper answer__input-wrapper'>
						<div className='input answer__input' style={{ padding: '0' }}>
							<Skeleton style={{ display: 'flex' }} duration={1} />
						</div>
						<div className='image-wrapper answer__image-wrapper'>
							<button type='button' className='button'>
								<div style={{ height: '100%', width: '100%' }}>
									<Skeleton height={'100%'} width={'100%'} style={{ display: 'flex' }} duration={1} />
								</div>
							</button>
						</div>
					</div>

					<div className='answer__delete-container'>
						<button type='button' style={{ padding: '0px' }} className='button button-danger'>
							<div style={{ height: '100%', width: '100%' }}>
								<Skeleton height={'100%'} width={'100%'} style={{ display: 'flex' }} duration={1} />
							</div>
						</button>
					</div>
				</div>
			</div>
		</SkeletonTheme>
	);
}

export default SkeletonAnswer;
