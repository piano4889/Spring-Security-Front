import React from 'react';
import LoginForm from '../component/login/LoginForm';
import axios from "axios";

const LoginPage = () => {

	return (
		<>
			<LoginForm/>
			<div>
				<a href="http://localhost:8080/oauth2/authorization/kakao">카카오톡 로그인</a>
			</div>
		</>
	);
};

export default LoginPage;