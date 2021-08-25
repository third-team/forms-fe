import { axios } from 'core';

export default {
	createForm: () =>
		axios.post('/forms', {
			name: 'Form name',
			questions: [{ question: 'Question', answerType: 'checkbox', answers: [{ answer: 'Answer', isCorrect: false }] }],
		}),
	getForms: () => axios.get('/forms/my'),
	removeForm: (formId) => axios.delete(`/forms/${formId}`),
};
