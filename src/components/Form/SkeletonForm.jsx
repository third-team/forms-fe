import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import SkeletonQuestion from './SkeletonQuestion';

function SkeletonForm() {
	return (
		<SkeletonTheme color='#434343' highlightColor='#4d4d4d'>
			<div className='container form'>
				<div className='input-wrapper form__input-wrapper'>
					<div className='input form__input' style={{ padding: '0' }}>
						<Skeleton height={'100%'} width={'100%'} style={{ display: 'flex' }} duration={1} />
					</div>
					<div className='image-wrapper form__image-wrapper'>
						<button type='button' className='button'>
							<div style={{ height: '100%', width: '100%' }}>
								<Skeleton height={'100%'} width={'100%'} style={{ display: 'flex' }} duration={1} />
							</div>
						</button>
					</div>
				</div>

				<SkeletonQuestion />

				<button type='button' style={{ padding: 'initial' }} className='button button-primary margin-left margin-bottom'>
					<div style={{ height: '100%', width: '100%' }}>
						<Skeleton height={'100%'} width={'100%'} style={{ display: 'flex' }} duration={1} />
					</div>
				</button>

				{/* <button type='button' style={{ padding: 'initial' }} className='button button-original margin-bottom'>
					<div style={{ height: '100%', width: '100%' }}>
						<Skeleton height={'100%'} width={'100%'} style={{ display: 'flex' }} duration={1} />
					</div>
				</button> */}
			</div>
		</SkeletonTheme>
	);
}

export default SkeletonForm;
