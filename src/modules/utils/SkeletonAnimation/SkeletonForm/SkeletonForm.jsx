import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import SkeletonQuestion from './SkeletonQuestion';

const SkeletonForm = () => {
	return (
		<SkeletonTheme color='#434343' highlightColor='#4d4d4d'>
			<div className='form container'>
				<div className='form__input input' style={{ padding: '0' }}>
					<Skeleton height={'100%'} width={'100%'} style={{ display: 'flex' }} duration={1} />
				</div>

				<SkeletonQuestion />

				<button type='button' style={{ padding: 'initial' }} className='button-primary button margin-left margin-bottom'>
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
};

export default SkeletonForm;
