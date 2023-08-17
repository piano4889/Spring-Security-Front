import React from 'react';
import { useNavigate } from "react-router-dom";
import classes from './BoardList.module.css';

const BoardList = (props) => {
	const navigate = useNavigate();
	const onclickHandler = () => {
		console.log("=== boardList");
		navigate("/boards/details/" + props.idx);
	}
	return (
			<table className={classes.boardTable}>
				<thead>
				<tr>
					<th>글번호</th>
					<th>제목</th>
					<th>글쓴이</th>
					<th>내용</th>
					<th>작성일자</th>
				</tr>
				</thead>
				<tbody>
				<tr onClick={onclickHandler}>
					<td>{props.idx}</td>
					<td>{props.title}</td>
					<td>{props.writer}</td>
					<td>{props.content}</td>
					<td>{props.regdate}</td>
				</tr>
				</tbody>
			</table>
	);
};

export default BoardList;