import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonFormsListItem = () => {
	return (
		<SkeletonTheme color='#343434' highlightColor='#4d4d4d'>
			<div className='form-preview-wrapper slide-animation-block'>
				<div className='form-preview'>
					<h1>
						<Skeleton width={250} duration={0.75} />
					</h1>
					<div className='form-preview__buttons-wrapper'>
						<button type='button' style={{ padding: 'initial' }} className='button button-success'>
							Edit
						</button>
						<button type='button' style={{ padding: 'initial' }} className='button button-danger'>
							Delete
						</button>
					</div>
				</div>
			</div>
		</SkeletonTheme>
	);
};

export default SkeletonFormsListItem;
