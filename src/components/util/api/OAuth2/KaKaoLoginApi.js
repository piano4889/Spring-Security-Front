import axios from "axios";
import { REDIRECT_URI, REST_API_KEY, SECRET_KEY } from "../../../component/login/oauth2/kakao/KakaoKey";
import axiosInstance from "../../AxiosInstance";

export const getKaKaoAccessToken = async (code) => {
	const sendRequest = `https://kauth.kakao.com/oauth/token`;
	try {
		const response = await axios({
			method : "POST",
			url    : sendRequest,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			data   : `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}&client_secret=${SECRET_KEY}`,
		});
		return response.data;
	} catch (e) {
		console.log("getKaKaoAccessToken", e);
		return null;
	}
};

export const getKakaoCode = async () =>{
	try{
	const response = await axiosInstance({
		url:"http://localhost:8080/user/social"
	});
		console.log(response);
		return response;
	} catch (e) {
		console.log("getKakaoCode error", e);
		return null
	}
}