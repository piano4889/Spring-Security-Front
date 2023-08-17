import React from 'react';
import { useRecoilValue } from "recoil";
import { userState } from "../recoil";
import styles from './Welcom.module.css';
import LoginForm from "../component/login/LoginForm";

const Welcome = (props) => {
	const accountValue = useRecoilValue(userState);
	return (
		<>
			<div className={styles.MainContent}>
				<LoginForm/>
			</div>

		</>
	)
		;
};

export default Welcome;