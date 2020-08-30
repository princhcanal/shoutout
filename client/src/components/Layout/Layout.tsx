import React from 'react';
import styles from './Layout.module.scss';

import Navbar from '../Navbar/Navbar';

interface LayoutProps {
	children: any;
}

const Layout = (props: LayoutProps) => {
	return (
		<div className={styles.layout}>
			<Navbar />
			<main>{props.children}</main>
		</div>
	);
};

export default Layout;
