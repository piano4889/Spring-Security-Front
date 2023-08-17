import { Fragment, useRef, useState } from 'react';

import Card from '../ui/Card';
import LoadingSpinner from '../ui/LoadingSpinner';
import classes from './LoginForm.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { userState } from "../../recoil";

const LoginForm = (props) => {
	const authorInputRef = useRef(null);
	const textInputRef = useRef(null);
	const [isEntered, setIsEntering] = useState();
	const [account, setAccount] = useRecoilState(userState);
	const navigate = useNavigate();

	function submitFormHandler(event) {
		event.preventDefault();

		const enteredId = authorInputRef.current.value;
		const enteredPassword = textInputRef.current.value;

		//TODO Session storage 학습
		axios({
				url            : 'http://localhost:8080/login',
				method         : 'POST',
				withCredentials: true,
				data           : {
					'id'      : enteredId,
					'password': enteredPassword,
				},
			},
		).then(response => {
			console.log('====LoginForm, response====');
			console.log(response);

			if (response.status === 200) {
				alert('로그인 성공\n환영합니다 ' + enteredId + '님');
				console.log(response.status);
				localStorage.setItem('AccessToken', response.headers.get('Authorization'));
				setAccount({
					isLogin: true,
					name: enteredId,
					isSocial:null,
				});
				navigate("/welcome");
			}
		}).catch(reason => {
				alert('정상적인 로그인이 아닙니다.');
				console.log(reason);
			});
		// optional: Could validate here
	}

	const formFocusedHandler = () => {
		setIsEntering(true);
	};
	const finishingEnteringHandler = () => {
		setIsEntering(false);
	};

	return (
		<Fragment>
			<Card>
				<form onFocus={formFocusedHandler} className={classes.form}
				      onSubmit={submitFormHandler}>
					{props.isLoading && (
						<div className={classes.loading}>
							<LoadingSpinner/>
						</div>
					)}
					<div className={classes.control}>
						<label htmlFor="username">아이디</label>
						<input type="text" id="username" ref={authorInputRef}/>
					</div>
					<div className={classes.control}>
						<label htmlFor="text">비밀번호</label>
						<input type="password" id="password"
						       ref={textInputRef}></input>
					</div>
					<div className={classes.actions}>
						<button onClick={finishingEnteringHandler}
						        className="btn">로그인
						</button>
					</div>
				</form>
			</Card>
		</Fragment>
	);
};

export default LoginForm;
