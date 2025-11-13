import React from "react";

interface PaginationProps {
	totalPages: number;
	currentPage: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	totalPages,
	currentPage,
	onPageChange,
}) => {
	if (totalPages <= 1) return null;

	const handlePageChange = (page: number) => {
		const url = new URL(window.location.href);
		url.searchParams.set("page", page.toString());
		window.history.pushState({}, "", url.toString());
		onPageChange(page);
	};

	return (
		<div className="container mt-4">
			<div className="d-flex justify-content-center gap-2">
				<button
					className="btn btn-outline-secondary"
					onClick={() =>
						handlePageChange(
							currentPage - 1
						)
					}
					disabled={currentPage === 1}
				>
					Prev
				</button>

				{Array.from(
					{ length: totalPages },
					(_, i) => i + 1
				).map((page) => (
					<button
						key={page}
						onClick={() =>
							handlePageChange(page)
						}
						className={`btn ${
							page === currentPage
								? "btn-primary"
								: "btn-outline-secondary"
						}`}
					>
						{page}
					</button>
				))}

				<button
					className="btn btn-outline-secondary"
					onClick={() =>
						handlePageChange(
							currentPage + 1
						)
					}
					disabled={currentPage === totalPages}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default Pagination;
