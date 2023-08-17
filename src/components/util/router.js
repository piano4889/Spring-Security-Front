import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import SignPage from "../pages/SignPage";
import KaKaoLogin from "../component/login/oauth2/kakao/KaKaoLogin";
import KaKaoLogout from "../component/login/oauth2/kakao/KaKaoLogout";
import Welcome from "../pages/Welcome";
import PrivateRoute from "../pages/PrivateRoute";
import LoginPage from "../pages/LoginPage";
import BoardPage from "../pages/BoardPage";
import BoardDetail from "../component/board/BoardDetail";
import BoardForm from "../component/board/BoardForm";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate replace to="/welcome"/>}/>
			<Route path="/sign" element={<SignPage/>}/>
			{/*Oauth2 Login*/}
			<Route path="oauth2">
				<Route index path="kakao" element={<KaKaoLogin/>}/>
			</Route>
			<Route path="/social/logout" element={<KaKaoLogout/>}/>
			<Route path="welcome" element={<Welcome/>}/>
			<Route element={<PrivateRoute isPrivate={false}/>}>
				<Route path="login" element={<LoginPage/>}/>
			</Route>
			<Route path="boards">
				<Route path=":pagesNum" element={<BoardPage/>}/>

				<Route path="details">
					<Route path=":boardIdx" element={<BoardDetail/>}/>
				</Route>
				<Route path="write" element={<BoardForm/>}/>
			</Route>
		</Routes>
	);
};

export default Router;