import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import SkeletonAnswer from './SkeletonAnswer';

function SkeletonQuestion() {
	return (
		<SkeletonTheme color='#434343' highlightColor='#4d4d4d'>
			<div className='question-wrapper'>
				<div className='question'>
					<div className='question__parameters-line'>
						<div className='input-wrapper question__input-wrapper'>
							<div className='input question__input' style={{ padding: '0' }}>
								<Skeleton style={{ display: 'flex' }} duration={1} />
							</div>
							<div className='image-wrapper question__image-wrapper'>
								<button type='button' className='button'>
									<div style={{ height: '100%', width: '100%' }}>
										<Skeleton height={'100%'} width={'100%'} style={{ display: 'flex' }} duration={1} />
									</div>
								</button>
							</div>
						</div>
					</div>

					<SkeletonAnswer />

					{/* <div className='answer'>
						<div className='input-container'>
							<div className='input' style={{ padding: '0' }}>
								<Skeleton height={'100%'} width={'100%'} style={{ display: 'flex' }} duration={1} />
							</div>
							<div className='image-container'>
								<button type='button'>
									<Skeleton height={'100%'} width={'100%'} style={{ display: 'flex' }} duration={1} />
								</button>
							</div>
						</div>

						<div className='delete-container'>
							<button type='button' style={{ padding: 'initial' }} className='button button-danger'>
								<div style={{ height: '100%', width: '100%' }}>
									<Skeleton height={'100%'} width={'100%'} style={{ display: 'flex' }} duration={1} />
								</div>
							</button>
						</div>
					</div> */}

					<div className='question__button-line'>
						<button type='button' style={{ padding: '0px' }} className='button button-success margin-right'>
							<div style={{ height: '100%', width: '100%' }}>
								<Skeleton height={'100%'} width={'100%'} style={{ display: 'flex' }} duration={1} />
							</div>
						</button>

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

export default SkeletonQuestion;
