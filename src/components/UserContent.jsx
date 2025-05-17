import React from 'react';
import UserCard from './UserCard';

function UserContent({ users, onEdit, onDelete }) {
	return (
		<>
			<div>
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
