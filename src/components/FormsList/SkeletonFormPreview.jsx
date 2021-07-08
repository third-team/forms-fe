import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function SkeletonFormPreview() {
	return (
		<SkeletonTheme color='#343434' highlightColor='#4d4d4d'>
			<div className='forms-list__form-name'>
				<h1>
					<Skeleton width={250} duration={0.75} />
				</h1>
				<div className='forms-list__buttons-wrapper'>
					<button type='button' style={{ padding: 'initial' }} className='button button-success'>
						<div style={{ height: '100%', width: '100%' }}>
							<Skeleton height={'100%'} width={'100%'} style={{ display: 'flex' }} duration={1} />
						</div>
					</button>
					<button type='button' style={{ padding: 'initial' }} className='button button-danger'>
						<div style={{ height: '100%', width: '100%' }}>
							<Skeleton height={'100%'} width={'100%'} style={{ display: 'flex' }} duration={1} />
						</div>
					</button>
				</div>
			</div>
		</SkeletonTheme>
	);
}

export default SkeletonFormPreview;
