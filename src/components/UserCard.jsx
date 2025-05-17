import React from 'react';
import { formatDate } from '../lib/util';

function UserCard({ user, onEdit, onDelete }) {
	return (
		<div>
			<img src={user.image_url} alt={user.first_name} width={85} height={85} />
			<h2>
				{user.first_name} {user.last_name}
			</h2>
			<p>{user.email}</p>
			<p>{formatDate(user.birthday)} </p>

			<div>
				<button onClick={() => onEdit(user)}>Update</button>
				<button onClick={() => onDelete(user)}>Delete</button>
			</div>
		</div>
	);
}

export default UserCard;
