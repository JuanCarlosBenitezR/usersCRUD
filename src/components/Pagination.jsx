function Pagination({ page, totalPages, prev, next }) {
	return (
		<div
			style={{
				display: 'flex',
				gap: 20,
				justifyContent: 'center',
				alignItems: 'center',
				margin: '20px 0',
			}}
		>
			<button
				onClick={prev}
				disabled={page === 1}
				className="bg-blue-500 text-white px-4 py-2 rounded"
			>
				prev
			</button>
			<p>
				{page} of {totalPages}
			</p>
			<button
				onClick={next}
				disabled={page === totalPages}
				className="bg-blue-500 text-white px-4 py-2 rounded"
			>
				next
			</button>
		</div>
	);
}

export default Pagination;
