import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil";

const PrivateRoute = ({ isPrivatePage }) => {
	const recoilValue = useRecoilValue(userState);
	console.log(recoilValue);
	 const isLogin = recoilValue.isLogin;

	return (
		<>
			{
				isPrivatePage ?
					(isLogin ? <Outlet/> : <Navigate to="login"/>)
					:
					// 공용페이지
					(isLogin ? <Navigate to="/"/> : <Outlet/>)
			}
		</>
	);
};

export default PrivateRoute;