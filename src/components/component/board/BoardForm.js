import React, { Fragment, useRef, useState } from 'react';
import Card from "../ui/Card";
import classes from "../login/LoginForm.module.css";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../util/AxiosInstance";

const BoardForm = (props) => {
	const titleInputRef = useRef(null);
	const contentInputRef = useRef(null);
	const fileInputRef = useRef(null);

	const [isEntered, setIsEntering] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [file, setFile] = useState('');

	const navigate = useNavigate();

	const formFocusedHandler = () => {
		setIsEntering(true);
	};

	const fileHandler = (event) => {
		console.log(event.target.files);
		setFile(event.target.files[0]);
	}
	const submitHandler = (event) => {
		event.preventDefault();
		setIsLoading(true);

		const frm = new FormData();
		frm.append("title", titleInputRef.current.value);
		frm.append("content", contentInputRef.current.value);
		frm.append("filename", file);
		AxiosInstance.post(
			'http://localhost:8080/boardMake',
			frm, {
				headers: {
					'Content-Type': 'multipart/form-data',
				}
			},
		).then(res => {
			alert("게시글 작성 성공!");
			navigate(-1);
		}).catch(error => {
			console.log(error);
		});
		setIsLoading(false);

	};
	return (
		<Fragment>
			<Card>
				<form
					encType="multipart/form-data"
					onFocus={formFocusedHandler}
					className={classes.form}
					onSubmit={submitHandler}>
					{(isLoading &&
						<div className={classes.loading}>
							<LoadingSpinner/>
						</div>
					)}
					<div className={classes.control}>
						<label htmlFor="title">제목</label>
						<input type="text" id="title" ref={titleInputRef}/>
					</div>
					<div className={classes.control}>
						<label htmlFor="content">내용</label>
						<textarea id="content"
						          ref={contentInputRef}></textarea>
					</div>
					<div className={classes.control}>
						<label htmlFor="file">첨부파일</label>
						<input id="file"
						       type={"file"}
						       ref={fileInputRef}
						       onChange={fileHandler}
						></input>
					</div>
					<div className={classes.actions}>
						<button type={"submit"}
						        className="btn">
							글쓰기
						</button>
						<button
							type={"button"}
							className="btn">
							뒤로가기
						</button>
					</div>
				</form>
			</Card>
		</Fragment>
	);
};

export default BoardForm;