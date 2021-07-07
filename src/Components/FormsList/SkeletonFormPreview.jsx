import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function SkeletonFormPreview() {
	return (
		<SkeletonTheme color='#343434' highlightColor='#4d4d4d'>
			<div className='form-name'>
				<h1>
					<Skeleton width={250} duration={0.75} />
				</h1>
				<div className='button-container'>
					<button type='button' style={{ padding: 'initial' }} className='button button-success'>
						<div style={{ height: '100%', width: '100%' }}>
							<Skeleton height={'95%'} width={'95%'} duration={0.75} />
						</div>
					</button>
					<button type='button' style={{ padding: 'initial' }} className='button button-danger'>
						<div style={{ height: '100%', width: '100%' }}>
							<Skeleton height={'95%'} width={'95%'} duration={0.75} />
						</div>
					</button>
				</div>
			</div>
		</SkeletonTheme>
	);
}

export default SkeletonFormPreview;
