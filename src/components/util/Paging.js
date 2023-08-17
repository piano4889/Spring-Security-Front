import Pagination from "react-js-pagination";
import './Paging.css';

export const Paging = ({page, count, setPage, isFirstPage, isLastPage}) => {

	return (
		<Pagination itemClass="page-item" linkClass="page-link"
			activePage={page}
			itemsCountPerPage={5}
			totalItemsCount={count}
			pageRangeDisplayed={5}
			prevPageText={isFirstPage ? null : '<'}
			nextPageText={isLastPage ? null : '>'}
			onChange={setPage}
		/>);
}