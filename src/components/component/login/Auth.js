import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil";

const Auth = () => {
	// const [searchParams, setSearchParams] = useSearchParams();
	// const accessToken = searchParams.get("accessToken");
	// const refreshToken = searchParams.get("refreshToken");
	// const nickname = searchParams.get("nickname");
	// const email = searchParams.get("email");
	const params = useParams();
	useEffect(() => {
		console.log(params);


	},[]);

	return (
		<div>
			<h3>로그인 성공</h3>

		</div>
	);
};

export default Auth;