import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../../../util/AxiosInstance";
import { useSetRecoilState } from "recoil";
import { userState } from "../../../../recoil";

const KaKaoLogout = () => {
	const navigate = useNavigate();
	const state = useSetRecoilState(userState);
	useEffect(() => {
		AxiosInstance.post("http://localhost:8080/logout")
			.then(response => {
				console.log(response);
				state({
					isLogin : false,
					name    : null,
					isSocial: null,
					email   : null,
				});
				localStorage.clear();
				sessionStorage.clear();
				navigate("/");
			}).catch(error => {
			console.log("KakaoLogout Fail", error);
		})
//TODO 쿠키 삭제
	})

	return (
		<></>
	);
};

export default KaKaoLogout;