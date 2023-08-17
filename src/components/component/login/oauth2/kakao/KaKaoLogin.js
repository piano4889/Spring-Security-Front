import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getKaKaoAccessToken, getKakaoCode } from "../../../../util/api/OAuth2/KaKaoLoginApi";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../../../../recoil";
import { KAKAO_LOGOUT_URL, REST_API_KEY } from "./KakaoKey";
import { setCookie } from "../../../../util/Cookies";

const KaKaoLogin = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const accessToken = searchParams.get("accessToken");
	const refreshToken = searchParams.get("refreshToken");
	const nickname = searchParams.get("nickname");
	const email = searchParams.get("email");
	const navigate = useNavigate();

	const account = useSetRecoilState(userState);
	useEffect(() => {
		console.log(accessToken);
		console.log("refreshToken",refreshToken);
		localStorage.setItem("AccessToken", "Bearer " + accessToken);
		setCookie("refreshToken", refreshToken,{
			path:"/",
			secure: true,
			sameSite:"none",
		});
		account({
			isLogin : true,
			name    : nickname,
			isSocial: "kakao",
			email   : email,
		});
		navigate("/");
	})


	return (
		<></>
	);
};

export default KaKaoLogin;