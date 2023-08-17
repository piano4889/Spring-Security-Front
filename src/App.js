import './App.css';
import Layout from './components/component/layout/Layout';
import React from 'react';
import { RecoilRoot } from "recoil";
import Router from "./components/util/router";

function App() {

	//TODO Best Practice (Component, Store(Recoil, Redux, Axios) , Pages) --> Layer(Directory Structure)
	//package.json 안 script 디테일 알아보기

	//Rendering , Life Cycle
	return (
		<RecoilRoot>
			<Layout>
				<Router/>
			</Layout>
		</RecoilRoot>
	);
}

export default App;
