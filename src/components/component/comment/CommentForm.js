import React, { useRef, useState } from 'react';
import classes from "./CommentForm.module.css";
import axiosInstance from "../../util/AxiosInstance";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil";

const CommentForm = (props) => {


	const account = useRecoilValue(userState);
	const contentInputRef = useRef(null);
	const params = useParams();
	const [content, setContent] = useState(null);

	const commentSubmitHandler = async (event) => {
		event.preventDefault();
		props.isSumbitted(false);
		await axiosInstance.post(`http://localhost:8080/comment/${params.boardIdx}`,
			{
				"writer" : account.name,
				"content": contentInputRef.current.value,
			}).then(res => {
			if (res.data === 'Insert Success') {
				alert("댓글 작성 성공!")
				props.isSumbitted(true);
				setContent('');
			}
		}).catch(error => {
			props.isSumbitted(false);
			console.log(error);
		});
	};
	const typeHandler = (event) =>{
		setContent(event.target.value);
	}
	return (
		<div className={classes.card}>
			<form className={classes.comment} onSubmit={commentSubmitHandler}>
				<div className={classes.commentTitle}>
					<div>
						<label htmlFor="writer">작성자</label>
						<input type="text" id="writer" value={account.name} readOnly/>
					</div>
					<div>
						<label htmlFor="content">내용</label>
						<textarea id="content"
						          ref={contentInputRef}
						          value={content}
						          onChange={typeHandler}/>
					</div>
				</div>
				<div className={classes.btnArea}>
					<button>댓글 작성</button>
				</div>
			</form>
		</div>
	);
};

export default CommentForm;