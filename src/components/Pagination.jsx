function Pagination({ page, totalPages, prev, next }) {
	return (
		<div
			style={{
				display: 'flex',
				gap: 20,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<button onClick={prev} disabled={page === 1}>
				prev
			</button>
			<p>
				{page} of {totalPages}
			</p>
			<button onClick={next} disabled={page === totalPages}>
				next
			</button>
		</div>
	);
}

export default Pagination;
