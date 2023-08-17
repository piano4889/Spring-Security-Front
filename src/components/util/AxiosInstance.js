import React from 'react';
import axios from "axios";

const AxiosInstance = axios.create();
AxiosInstance.interceptors.request.use(
	async config => {
		const accessToken = localStorage.getItem('AccessToken');

		config.headers = {
			'Authorization': `${accessToken}`,
		};
		config.withCredentials = true;
		return config;
	},
	error => {
		Promise.reject(error);
	}
)
;

AxiosInstance.interceptors.response.use((response) => {
		return response
	}, async function (error) {

		const originalRequest = error.config;
		// console.log(error.response.status); // error객체 안의 status 확인
		switch (error.response.status) {

			case 409:
				console.log("error.response", error.response.headers.authorization);
				const newAccessToken = error.response.headers.authorization; // error객체 속 새로 발급한 Access 변수화
				if (newAccessToken) {
					originalRequest.headers['Authorization'] = newAccessToken; //origin Request에 새로운 토큰 셋업
					console.log("New Access", originalRequest.headers['Authorization'] = newAccessToken);
					localStorage.setItem('AccessToken', newAccessToken); //LocalStorage에 업데이트
				}
				return axios(originalRequest);

			default:
				console.log("AxiosInstance error", error);
				return Promise.reject(error);
		}
	}
);

export default AxiosInstance;


