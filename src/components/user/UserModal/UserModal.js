import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, fetchUser } from 'redux/slices/userSlice';
import {
	setAuthError,
	toggleModalLogin,
	toggleModalOpen,
} from 'redux/slices/authModalSlice';
import UserForm from 'components/user/UserForm/UserForm';

import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import { app } from '../../../firebase/firebase';

import { handleError } from 'utils/handleError';
import { CircularProgress } from '@mui/material';

const UserModal = () => {
	const dispatch = useDispatch();
	const { isModalOpen, isModalLogin } = useSelector(state => state.authModal);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {}, [isModalOpen]);

	const handleLogin = (email, password) => {
		const auth = getAuth(app);
		setIsLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				setIsLoading(false);
				dispatch(fetchUser(user.uid));
				dispatch(toggleModalOpen());
			})
			.catch(error => {
				setIsLoading(false);
				dispatch(setAuthError(handleError(error.message)));
			});
	};

	const handleSignUp = (email, password, name) => {
		const auth = getAuth(app);
		setIsLoading(true);
		createUserWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				setIsLoading(false);
				dispatch(
					addUser({
						email: user.email,
						uid: user.uid,
						name,
						cities: [],
						photo: '',
					})
				);
				dispatch(setAuthError(null));
				dispatch(toggleModalLogin());
			})
			.catch(error => {
				setIsLoading(false);
				dispatch(setAuthError(handleError(error.message)));
			});
	};

	return (
		<div
			className={`user-modal__container ${isModalOpen ? '' : `hidden`}
			`}
		>
			{isModalLogin ? (
				<UserForm
					title='Войти в аккаунт'
					handleClick={handleLogin}
					buttonName={
						isLoading ? <CircularProgress color='inherit' size={18} /> : 'Войти'
					}
					tabIndex={isModalOpen ? 0 : -1}
				/>
			) : (
				<UserForm
					title='Создать аккаунт'
					handleClick={handleSignUp}
					buttonName={
						isLoading ? (
							<CircularProgress color='inherit' size={18} />
						) : (
							'Зарегистрироваться'
						)
					}
					tabIndex={isModalOpen ? 0 : -1}
				/>
			)}
		</div>
	);
};
export default UserModal;
