import { Button } from 'components';

import { FormsListItem } from 'modules/FormsListItem';

const FormsList = ({ formsList, createForm }) => {
	return (
		<div className='container forms-list'>
			{formsList.length === 0 ? (
				<h1>You haven&apos;t created any forms yet... Do you want to create a new one?</h1>
			) : (
				formsList.map((item) => <FormsListItem formId={item._id} name={item.name} key={item._id} />)
			)}

			<Button content='Create Form' variant='primary' classNames='margin-bottom' onClickCallback={createForm} />
		</div>
	);
};

export default FormsList;
