import React from 'react';
import classes from './MainNavigation.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { userState } from "../../recoil";
import AxiosInstance from "../../util/AxiosInstance";
import { KAKAO_LOGOUT_URL } from "../login/oauth2/kakao/KakaoKey";

const MainNavigation = () => {
	const [account, setAccount] = useRecoilState(userState);
	const navigate = useNavigate();

	const LogoutHandler = () => {
		if (account.isLogin) {
			AxiosInstance({
					url            : 'http://localhost:8080/logout',
					method         : 'POST',
					headers        : {
						'Authorization': localStorage.getItem('AccessToken'),
					},
					withCredentials: true,
				}
			).then(response => {
				alert("로그아웃 성공!");
			}).finally(() => {
				setAccount({
					isLogin : false,
					name    : null,
					isSocial: null,
				});
				localStorage.clear();
			});
		}
	};

	return (
		<header className={classes.header}>
			<NavLink to="/" className={classes.logo}>Spring Security Study</NavLink>
			<nav className={classes.nav}>
				<ul>
					{!account.isLogin &&
					<li>
						<NavLink
							className={(isActive) =>
								isActive ? classes.active : undefined
							} to="/sign">
							회원 가입
						</NavLink>
					</li>
					}
					{!account.isLogin &&
						<li>
							<NavLink
								className={(isActive) =>
									isActive ? classes.active : undefined
								} to="/login">
								로그인
							</NavLink>
						</li>
					}
					{account.isLogin && !account.isSocial &&
						<li>
							<NavLink to=""
							         className={
								         (isActive) =>
									         isActive ? classes.active : undefined}
							         onClick={LogoutHandler}>로그아웃</NavLink>
						</li>
					}
					{account.isLogin && account.isSocial &&
						<li>
							<NavLink to={`${KAKAO_LOGOUT_URL}`}
							         className={
								         (isActive) =>
									         isActive ? classes.active : undefined}
							         // onClick={socialLogoutHandler}
							>로그아웃</NavLink>
						</li>
					}
					<li>
						<NavLink
							className={
								(isActive) =>
									isActive ? classes.active : undefined
							}
							to="/boards/:pageNum">
							게시판
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;