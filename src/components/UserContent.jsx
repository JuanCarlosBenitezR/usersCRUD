import React from 'react';
import UserCard from './UserCard';

function UserContent({ users, onEdit, onDelete }) {
	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
				{users.map((user) => (
					<UserCard
						key={user.id}
						user={user}
						onEdit={onEdit}
						onDelete={onDelete}
					/>
				))}
			</div>
			{users.length === 0 && <p>No users</p>}
		</>
	);
}

export default UserContent;
