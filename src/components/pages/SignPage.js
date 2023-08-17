import React, { Fragment, useRef, useState } from 'react';
import Card from "../component/ui/Card";
import classes from "../component/login/LoginForm.module.css";
import LoadingSpinner from "../component/ui/LoadingSpinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignPage = (props) => {
	const userNameInput = useRef('');
	const passwordInput = useRef('');
	const [isEntered, setIsEntering] = useState('');
	const navigate = useNavigate();
	const submitFormHandler = (event) =>{
		event.preventDefault();
		let data = {
			id      : userNameInput.current.value,
			password: passwordInput.current.value,
		};
		console.log(JSON.stringify(data));
				axios.post("http://localhost:8080/create", JSON.stringify(data), {
			headers: { "Content-Type": `application/json` }
		}).then(response => {
			console.log(response);
					navigate("/login");
		});

	};
	const formFocusedHandler = () => {
		setIsEntering(true);
	};
	const finishingEnteringHandler = () => {
		setIsEntering(false);
	};

	return (
		<div>
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
							<input type="text" id="username" ref={userNameInput}/>
						</div>
						<div className={classes.control}>
							<label htmlFor="password">비밀번호</label>
							<input type="password" id="password"
							       ref={passwordInput}></input>
						</div>
						<div className={classes.actions}>
							<button type={"submit"}
							        onClick={finishingEnteringHandler}
							        className="btn">회원가입
							</button>
						</div>
					</form>
				</Card>
			</Fragment>
		</div>
	);
};

export default SignPage;