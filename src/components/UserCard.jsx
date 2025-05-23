import React from 'react';
import { formatDate } from '../lib/util';
import { GoGift } from 'react-icons/go';
import { FiEdit, FiTrash } from 'react-icons/fi';

function UserCard({ user, onEdit, onDelete }) {
	return (
		<div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center">
			{user.image_url && (
				<img
					src={user.image_url}
					alt={user.first_name}
					className=" rounded-full object-cover mb-4 w-1/2 aspect-square"
				/>
			)}
			<h2 className=" font-semibold text-gray-900">
				{user.first_name} {user.last_name}
			</h2>
			<div className="w-full h-1 bg-stone-50 mb-4 rounded" />
			<p className="text-gray-600 mb-3 ">{user.email}</p>
			<p className="flex item-center text-gray-500  mb-4 ">
				<GoGift className="mr-2" />
				{formatDate(user.birthday)}
			</p>
			<div className="w-full h-1 bg-stone-50 mb-4 rounded" />
			<div className=" flex space-x-2">
				<button
					onClick={() => onEdit(user)}
					className="px-4 py-1  bg-blue-500 text-white rounded hover:bg-blue-600 transition"
				>
					<FiEdit />
				</button>
				<button
					onClick={() => onDelete(user)}
					className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
				>
					<FiTrash />
				</button>
			</div>
		</div>
	);
}

export default UserCard;
