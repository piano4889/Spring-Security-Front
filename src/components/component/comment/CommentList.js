import React from 'react';
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil";

const CommentList = (props) => {
	const account = useRecoilValue(userState);
	return (
		<div>
			<div>
				<span><em>{props.writer}</em></span>
			</div>
			<div>
				<p>{props.content}</p>
			</div>
			<div>
				<span>{props.regdate}</span>
			</div>
			{account.name === props.writer
				?
				(
					<div className="btn-area">
						<div>
							<button>수정</button>
						</div>
						<div>
							<button>삭제</button>
						</div>
					</div>)
				:
				undefined
			}
		</div>
	);
};

export default CommentList;