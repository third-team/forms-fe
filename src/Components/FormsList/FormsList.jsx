import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import './FormsList.scss';

export default function FormsList() {
	const [forms, setForms] = useState([]);

	useEffect(() => {
		axios
			.get('https://third-team-forms.herokuapp.com/forms/names', { token: localStorage.token })
			.then((response) => {
				if (response.status === 200) {
					if (response.data.forms) {
						setForms(response.data.forms);
					}
				}
			})
			.catch((error) => {
				console.log(error.response.data.message);
			});
	}, []);

	return (
		<div className='container'>
			{forms.length === 0 ? (
				<h1>You haven&apos;t created any forms yet... Do you want to create a new one?</h1>
			) : (
				forms.map((item) => (
					<div key={item.id} className='form-name'>
						<h1>{item.name}</h1>
					</div>
				))
			)}

			<Link to='/create-form' className='margin-left'>
				<button type='button' className='button'>
					Create Form
				</button>
			</Link>
		</div>
	);
}
