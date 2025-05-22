import UserCard from './UserCard';
import Pagination from './Pagination';
import { usePagination } from '../hooks/usePagination';

function UserContent({ users, onEdit, onDelete }) {
	const { page, totalPages, items, prev, next } = usePagination(users);
	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 p-6">
				{items.map((user) => (
					<UserCard
						key={user.id}
						user={user}
						onEdit={onEdit}
						onDelete={onDelete}
					/>
				))}
			</div>
			<Pagination page={page} totalPages={totalPages} prev={prev} next={next} />
			{users.length === 0 && <p>No users</p>}
		</>
	);
}

export default UserContent;
