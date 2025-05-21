import React from 'react';
import { formatDate } from '../lib/util';
import { GoGift } from 'react-icons/go';
import { FiEdit, FiTrash } from 'react-icons/fi';

function UserCard({ user, onEdit, onDelete }) {
	return (
		<div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
			{user.image_url && (
				<img
					src={user.image_url}
					alt={user.first_name}
					width={85}
					height={85}
					className=" rounded-full object-cover mb-4"
				/>
			)}
			<h2 className="text-lg font-semibold text-gray-900">
				{user.first_name} {user.last_name}
			</h2>
			<p className="text-gray-600 text-sm">{user.email}</p>
			<p className="flex item-center text-gray-500 text-sm mb-4 ">
				<GoGift className="mr-2" />
				{formatDate(user.birthday)}
			</p>

			<div className=" flex space-x-2">
				<button
					onClick={() => onEdit(user)}
					className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
				>
					<FiEdit />
				</button>
				<button
					onClick={() => onDelete(user)}
					className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
				>
					<FiTrash />
				</button>
			</div>
		</div>
	);
}

export default UserCard;
