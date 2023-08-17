import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import BoardList from "../component/board/BoardList";
import { Paging } from "../util/Paging";
import AxiosInstance from "../util/AxiosInstance";
import './BoardPage.css';
import Card from "../component/ui/Card";

//Outlet은 중첩 라우팅에서 호출 시 어디에 위치하는지를 명시적으로 알려주는 hook
const BoardPage = () => {
		const navigate = useNavigate();
		//TODO 데이터 넘겨줘서 리스트 만들기
		const [totalBoards, setTotalBoards] = useState(0);
		const [nowPage, setNowPage] = useState(1);

		const [board, setBoard] = useState([]);
		const [isFirstPage, setIsFirstPage] = useState(false);
		const [isLastPage, setIsLastPage] = useState(false);

		const params = useParams();
		const getBoardList = (async () => {
			let url = '';
			if(params.pagesNum === ':pageNum'){
				url = `http://localhost:8080/boards/${nowPage}`
			} else{
				setPage(parseInt(params.pagesNum));
				url = `http://localhost:8080/boards/${params.pagesNum}`;
			}

			console.log(params);
			const response = await AxiosInstance({
				url            : url,
				headers        : {
					Authorization: localStorage.getItem('AccessToken'),
				},
				withCredentials: true,
			});
			console.log("response", response);
			return response;
		})

		useEffect(() => {
			getBoardList().then(response => {
				console.log(response);
				let boardList = [];
				response.data.list.map(board => {
					return boardList.push({
						...board,
						regdate: new Date(board.regdate).toLocaleDateString(),
					});
				});
				setBoard(boardList);
				setTotalBoards(response.data.total);
				setIsFirstPage(response.data.isFirstPage);
				setIsLastPage(response.data.isLastPage);
			}).catch(error =>{
				if (error.status === 401) {
				alert("로그인 정보가 없습니다.\n로그인페이지로 이동합니다.");
				}
			});
		}, [nowPage]);


		const setPage = useCallback((e) => {
			setNowPage(e);
			navigate("/boards/" + e);

		}, [navigate])

		return (
			<Card>
				<ul className="boardPage">
					<div className="boardList">
						{board.map((board) => (
							<BoardList
								key={board.idx}
								idx={board.idx}
								title={board.title}
								content={board.content}
								writer={board.writer}
								regdate={board.regdate}/>
						))}
					</div>
					<div>
						<Paging
							page={nowPage}
							count={totalBoards}
							setPage={setPage}
							isFirstPage={isFirstPage}
							isLastPage={isLastPage}
						/>
						<NavLink to="/boards/write"><button>글쓰기</button></NavLink>
					</div>
				</ul>
			</Card>
		);
	}
;

export default BoardPage;