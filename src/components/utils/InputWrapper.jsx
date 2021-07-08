import { connect } from 'react-redux';

import { updateFormTextActionCreator, updateQuestionTextActionCreator, updateAnswerTextActionCreator } from '../../redux/actionCreators';

import Input from './Input';

function InputWrapper(props) {
	return <Input {...props} />;
}

const mapStateToProps = (state, props) => {
	let inputTypeId;

	switch (props.inputType) {
		case 'answer':
			inputTypeId = props.answerId;
			break;
		case 'question':
			inputTypeId = props.questionId;
			break;
		case 'form':
			inputTypeId = props.formId;
			break;
		default:
			console.log('Input type is not valid!');
			break;
	}

	return {
		inputTypeId,
	};
};

const mapDispatchToProps = (dispatch) => ({
	updateTextInGlobalState: (inputType, text, questionId, answerId) => {
		switch (inputType) {
			case 'answer':
				dispatch(updateAnswerTextActionCreator(questionId, answerId, text));
				break;
			case 'question':
				dispatch(updateQuestionTextActionCreator(questionId, text));
				break;
			case 'form':
				dispatch(updateFormTextActionCreator(text));
				break;
			default:
				console.log('Input type is not valid!');
				break;
		}
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(InputWrapper);
