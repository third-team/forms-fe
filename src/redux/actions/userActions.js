import { SET_IS_AUTH } from 'redux/constants/userConstants';

export const setIsAuthActionCreator = (isAuth) => ({ type: SET_IS_AUTH, isAuth });
