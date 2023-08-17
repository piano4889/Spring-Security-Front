import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import AxiosInstance from "../../util/AxiosInstance";
import CommentList from "../comment/CommentList";
import Card from "../ui/Card";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil";
import CommentForm from "../comment/CommentForm";
import classes from './BoardDetail.module.css';
import { Paging } from "../../util/Paging";

const BoardDetail = () => {
	const params = useParams();
	const navigate = useNavigate();

	const [board, setBoard] = useState({});
	const [file, setFile] = useState({});
	const [commentList, setCommentList] = useState([]);
	const [isSubmitted, setIsSubmitted] = useState(false);

	//paging data
	const [totalComment, setTotalComment] = useState(0);
	const [nowPage, setNowPage] = useState(1);
	const [isFirstPage, setIsFirstPage] = useState(false);
	const [isLastPage, setIsLastPage] = useState(false);


	const account = useRecoilValue(userState);

	const getBoardDetail = useCallback((async () => {
		return await AxiosInstance(`http://localhost:8080/board/${params.boardIdx}`);
	}),[isSubmitted]);

	useEffect(() => {
		//TODO Board , Comment, File APi 분리 후 각자 호출
		getBoardDetail().then(res => {
			console.log("=====UseEffect BoardDetails");
			console.log("fileInfo", res.data.fileInfo);
			console.log("BoardInfo", res.data.board);
			// console.log("commentListInfo", res.data.commentList);
			if (res.data.board != null) {
				const board = {
					...res.data.board,
					regdate: new Date(res.data.board.regdate).toLocaleDateString()
				};
				setBoard(board);
				setFile(res.data.fileInfo);
			} else {
				navigate("/");
			}
		});
	}, [isSubmitted,navigate]);

	const getCommentList = useCallback((async () => {
		return await AxiosInstance(`http://localhost:8080/comments/${params.boardIdx}/${nowPage}`);
	}),[isSubmitted,nowPage]);

	useEffect(() => {
		console.log("=====UseEffect getCommentList");
		console.log("nowPage",nowPage);
		console.log(isSubmitted);
		getCommentList().then(res => {
			const confirmedCommentList = [];
			res.data.list.map(comment => {
				return confirmedCommentList.push({
					...comment,
					regdate: new Date(comment.regdate).toLocaleDateString(),
				});
			});
			setTotalComment(res.data.total);
			setCommentList(confirmedCommentList);
			setIsFirstPage(res.data.isFirstPage);
			setIsLastPage(res.data.isLastPage);
			console.log("Comment List Info",res.data);
		});
	},[getCommentList, isSubmitted, nowPage]);

	const setPage = useCallback((e) => {
		setNowPage(e);
	}, []);

	const backClickHandler = () => {
		console.log(params);
		navigate(-1);
	}

	return (
		<Card>
			<section>
				<table className={classes.boardDetail}>
					<thead>
					<tr>
						<th className={classes.writer}>글쓴이</th>
						<th className={classes.title}>제목</th>
						<th className={classes.regdate}>작성날짜</th>
					</tr>
					<tr>
						<td>{board.writer}</td>
						<td>{board.title}</td>
						<td>{board.regdate}</td>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td colSpan="3" className={classes.imgTd}>
							<span>
								<img src={`/asset/images/${file.folderPath}${file.saveName}`} alt={file.originName}/>
							</span>
						</td>
					</tr>
					<tr>
						<td colSpan="3">{board.content}</td>
					</tr>
					</tbody>
				</table>
			</section>
			<section>
				<div className="cmt-area">
					{commentList.length > 0 ? commentList.map(
							(comment) => (
								<Card>
									<CommentList
										key={comment.commentIdx}
										idx={comment.commentIdx}
										writer={comment.writer}
										content={comment.content}
										regdate={comment.regdate}
									/>
								</Card>
							))
						: <p>댓글이 없습니다.</p>}
					{commentList.length > 0
						?
						<Paging
							page={nowPage}
							count={totalComment}
							setPage={setPage}
							isFirstPage={isFirstPage}
							isLastPage={isLastPage}
						/> : null
					}
					<div>
						<CommentForm isSumbitted={setIsSubmitted}/>
					</div>
					<div className="btn-area">
						<button onClick={backClickHandler}>뒤로 가기</button>
						{board.writer === account.name ?
							(<>
								<button>수정</button>
								<button>삭제</button>
							</>)
							: null
						}
					</div>
				</div>
			</section>
		</Card>
	);
};

export default BoardDetail;