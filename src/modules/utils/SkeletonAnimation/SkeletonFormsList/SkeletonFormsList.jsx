import { SkeletonTheme } from 'react-loading-skeleton';

import SkeletonFormsListItem from './SkeletonFormsListItem';

const SkeletonFormsList = () => {
	return (
		<SkeletonTheme color='#343434' highlightColor='#4d4d4d'>
			<div className='container forms-list'>
				<SkeletonFormsListItem />
			</div>
		</SkeletonTheme>
	);
};

export default SkeletonFormsList;
