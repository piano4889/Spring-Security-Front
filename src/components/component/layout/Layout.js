import React, { Fragment } from 'react';
import MainNavigation from './MainNavigation';
import styles from './Layout.module.css';

const Layout = (props) => {
	return (
		<body>
			<MainNavigation/>
			<main className={styles.main}>
				<div className={styles.container}>
					{props.children}
				</div>
			</main>
		</body>
	);
};

export default Layout;